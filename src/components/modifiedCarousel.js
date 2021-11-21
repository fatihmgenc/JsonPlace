import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextareaAutosize, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { JsonContext } from '../context/jsonContext';
import ReadyTemplates from '../resources/readyTemplates';
const ModifiedCarousel = () => {
    var faker = require('faker');
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    const { contextState, contextStateActions } = useContext(JsonContext);
    const handleTemplateSelection = (index) => {
        let temp = {};
        ReadyTemplates[0].typeArray.forEach(element => {
            Reflect.set(temp, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
        });
        contextStateActions.jsonChanged(temp)
        contextStateActions.typesArrayChanged(ReadyTemplates[0].typeArray)
    }

    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={4}
                gutter={20}
                leftChevron={<button>{'<'}</button>}
                rightChevron={<button>{'>'}</button>}
                outsideChevron
                chevronWidth={chevronWidth}
            >
                {ReadyTemplates.map((item, index) => (
                    <Card style={{ backgroundColor: 'azure', margin: "1px" }}  >
                        <CardContent>
                            <CardHeader title={item.title} />
                            <Grid container >
                                <Grid xs={8}>
                                    <Typography variant={'body1'} noWrap >{item.description}  </Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Button onClick={() => handleTemplateSelection(index)} style={{ margin: 'auto', float: "right" }} variant="contained" color="primary" >
                                        Use
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </ItemsCarousel>
        </div>
    );
};

export default ModifiedCarousel;