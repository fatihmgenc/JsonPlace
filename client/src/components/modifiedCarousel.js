import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Collapse, Grid, IconButton, Typography } from '@material-ui/core';
import { ArrowDownward, Delete, ExpandMore, Remove, RemoveCircle, ExpandMoreOutlined, ExpandLessOutlined } from '@material-ui/icons';
import React, { useContext, useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { JsonContext } from '../context/jsonContext';
import ReadyTemplates from '../resources/readyTemplates';
import TemplateServices from "../protoServices/TemplateServices";

const ModifiedCarousel = (props) => {
    var faker = require('faker');
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    const { contextState, contextStateActions } = useContext(JsonContext);
    const [expanded, setExpanded] = useState(false);

    const handleTemplateSelection = (index) => {

        let temp = {};
        if (contextState.userTemplates.length > 0) {
            contextState.userTemplates[index].PropTypes.forEach(element => {
                Reflect.set(temp, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
            });
            contextStateActions.typesArrayChanged(contextState.userTemplates[index].PropTypes)
        }
        else {

            ReadyTemplates[0].typeArray.forEach(element => {
                Reflect.set(temp, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
            });
            contextStateActions.typesArrayChanged(ReadyTemplates[index].typeArray)
        }
        contextStateActions.jsonChanged(temp)
    }
    const handleTemplateDelete = async (id) => {
        await TemplateServices.Delete({ contextState, id, contextStateActions, asyncList: [TemplateServices.GetAll] });
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const CustomCardContent = (item) => {
        return (<CardContent>
            {item?.Description?.length > 0 ?
                <Grid container  >

                    <Typography variant="body2" color="text.secondary">
                        {`${expanded ? "" : item.Description.substring(0, 45) + "..."}`}
                    </Typography>
                    <IconButton onClick={handleExpandClick} aria-label="expand">
                        {expanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
                    </IconButton>
                    <Collapse in={expanded} >
                        <Typography paragraph>{item.Description}</Typography>
                    </Collapse>
                </Grid>
                :
                <Grid container  >
                    <Typography variant="body2" color="text.secondary">
                        ~No Description~
                    </Typography>
                </Grid>}

        </CardContent>
        )
    }

    return (
        <div >
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={4}
                gutter={20}
                leftChevron={<Button color="primary" variant='outlined' style={{ borderRadius: 25, borderRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} >{'<'}</Button>}
                rightChevron={<Button color="primary" variant='outlined' style={{ borderRadius: 25, borderLeft: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} >{'>'}</Button>}
                chevronWidth={chevronWidth}
            >
                {props?.isCustom ? contextState.userTemplates.map((item, index) => (
                    <Card key={item.Id} style={{ backgroundColor: 'white', margin: "1px" }}  >
                        <CardHeader title={item.Title} />
                        {CustomCardContent(item)}
                        <CardActions style={{ backgroundColor: "whitesmoke" }} >
                            <Button onClick={() => handleTemplateSelection(index)}
                                variant="contained"
                                color="primary" >
                                Use
                            </Button>
                            <Button onClick={() => handleTemplateDelete(item.Id)}
                                variant="contained"
                                color="secondary"
                                endIcon={<Delete />}
                                style={{ float: "right", marginLeft: 'auto' }}
                            >
                                Remove
                            </Button>
                        </CardActions>
                    </Card>
                )) : ReadyTemplates.map((item, index) => (
                    <Card key={index} style={{ backgroundColor: 'white', margin: "1px" }}  >
                        <CardHeader title={item.title} />
                        <CardContent>
                            <p>{item.description}</p>
                        </CardContent>
                        <CardActions style={{ backgroundColor: "whitesmoke" }} >
                            <Button onClick={() => handleTemplateSelection(index)}
                                variant="contained"
                                color="primary" >
                                Use
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </ItemsCarousel>
        </div>
    );
};

export default ModifiedCarousel;