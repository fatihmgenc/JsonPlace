import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextareaAutosize, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';

const ModifiedCarousel = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    const items = [{ title: "Template Title", description: "Button" },
    { title: "Template Title", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasaaaaaa" },
    { title: "Template Title", description: "bbbbbbbb" },
    { title: "Template Title", description: "cccccccc" },
    { title: "Template Title", description: "dddddddd" }]
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
                {items.map((item, index) => (
                    <Card style={{ backgroundColor: 'azure', margin: "1px" }}  >
                        <CardContent>
                            <CardHeader title={item.title} />
                            <Grid container >
                                <Grid xs={8}>
                                    <Typography variant={'body1'} noWrap >{item.description}  </Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Button style={{ margin: 'auto', float: "right" }} variant="contained" color="primary" >
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