import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { JsonContext } from '../context/jsonContext';
import ReadyTemplates from '../resources/readyTemplates';
import TemplateServices from "../protoServices/TemplateServices";
import { useMediaQuery } from 'react-responsive';

const ModifiedCarousel = (props) => {
    var faker = require('faker');
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const { contextState, contextStateActions } = useContext(JsonContext);
    const [expandedList, setExpandedList] = useState([]);
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const chevronWidth = 40;

    const handleTemplateSelection = (index, isCustom) => {

        let temp = {};
        if (isCustom) {
            contextState.userTemplates[index].PropTypes.forEach(element => {
                Reflect.set(temp, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
            });
            contextStateActions.typesArrayChanged(contextState.userTemplates[index].PropTypes)
        }
        else {
            ReadyTemplates[index].typeArray?.forEach(element => {
                Reflect.set(temp, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
            });
            contextStateActions.typesArrayChanged(ReadyTemplates[index].typeArray || [])
        }
        contextStateActions.jsonChanged(temp)
    }

    const handleTemplateDelete = async (id) => {
        await TemplateServices.Delete({ contextState, id, contextStateActions, callBacks: [TemplateServices.GetAll] });
    }

    const handleExpandClick = (id) => {
        if (expandedList.includes(id)) {
            setExpandedList(expandedList.filter(x => x != id));
        } else {
            setExpandedList([...expandedList, id]);
        }
    }

    const CustomCardContent = (item, index) => {
        return (
            <Card key={item.Id} style={{ backgroundColor: 'white', margin: "1px" }}>
                <CardHeader title={item.Title} style={{
                    height: "15px"
                }} ></CardHeader>
                <CardContent>
                    {item?.Description?.length > 0 ?
                        <Grid container  >
                            <Grid item  >
                                {item.Description.length > 45 ?
                                    <Typography
                                        style={{ cursor: "help" }}
                                        variant="button"
                                        onClick={() => handleExpandClick(item.Id)}
                                        variant="body2"
                                        color="text.secondary">
                                        {expandedList.includes(item.Id) ?
                                            item.Description + "...↑" :
                                            item.Description.substring(0, 45) + "...↓"}
                                    </Typography>
                                    :
                                    <Typography
                                        variant="body2"
                                        color="text.secondary">
                                        {item.Description}
                                    </Typography>
                                }
                            </Grid>
                        </Grid>
                        :
                        <Grid container  >
                            <Typography variant="body2" color="text.secondary">
                                ~No Description~
                            </Typography>
                        </Grid>}

                </CardContent>
                <CardActions style={{ backgroundColor: "whitesmoke" }} >
                    <Button onClick={() => handleTemplateSelection(index, true)}
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
            </Card >

        )
    }

    return (
        <div style={{
            backgroundColor: "white",
            borderRadius: "15px",
            border: "solid 5px",
            borderColor: "#3e51b5",
            padding: "15px"
        }} >
            <Typography variant="h4"
                style={{ marginBottom: "5px" }}
                color="textSecondary" >
                {!props?.isCustom ? "Example Templates" : "Custom User Templates"}
            </Typography>
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={isMobile ? 1 : 4}
                gutter={20}
                leftChevron={<Button
                    color="primary"
                    variant='outlined'
                    style={{
                        borderRadius: 25,
                        borderRight: 0,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0
                    }} >{'<'}</Button>}
                rightChevron={<Button
                    color="primary"
                    variant='outlined'
                    style={{
                        borderRadius: 25,
                        borderLeft: 0,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0
                    }} >{'>'}</Button>}
                chevronWidth={chevronWidth}
                infiniteLoop={true}
            >
                {props?.isCustom ? contextState.userTemplates.map((item, index) => (

                    CustomCardContent(item, index)
                )) : ReadyTemplates.map((item, index) => (
                    <div style={{ marginTop: "10px" }} >

                        <Card
                            key={index}
                            style={{ backgroundColor: 'white', margin: "1px" }}  >
                            <CardHeader
                                title={item.title}
                                style={{
                                    height: "15px"
                                }} >
                            </CardHeader>
                            <CardContent style={{
                                height: "15px",
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                            }}>
                                <div style={{ marginRight: "auto" }}>
                                    {item.description}
                                </div>
                            </CardContent>
                            <CardActions style={{ backgroundColor: "whitesmoke" }} >
                                <Button
                                    onClick={() => handleTemplateSelection(index, false)}
                                    variant="contained"
                                    color="primary" >
                                    Use
                                </Button>
                            </CardActions>
                        </Card>
                    </div>

                ))}
            </ItemsCarousel>
        </div >
    );
};

export default ModifiedCarousel;