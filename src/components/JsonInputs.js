import React from 'react';
import { useState } from 'react';
import { Card, Input, CardHeader, CardContent, CardActionArea, CardActions, Button, Menu, MenuItem, Grid, Box, Typography, List, ListItem, ListSubheader, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { object } from 'prop-types';
import { traverse } from '@babel/types';

const JsonInputs = () => {


    const useStyles = makeStyles({
        root: {
            height: 110,
            flexGrow: 1,
            maxWidth: 400,
        },
    });
    const classes = useStyles();


    const assignTypeSelection = (id) => {
        console.log(id)
    }


    var faker = require('faker');

    const data = {
        id: 'root',
        name: 'Parent',
        children: [
            {
                id: '1',
                name: 'Child - 1',
            },
            {
                id: '3',
                name: 'Child - 3',
                children: [
                    {
                        id: '4',
                        name: 'Child - 4',
                    },
                ],
            },
        ],
    };

    const getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')

    const travarseObjectsRecursive = (obj) => {


        let difference = Object.keys(obj).filter(x => !getMethods(obj).includes(x));

        if (difference.length > 0) {
            difference.map(a => travarseObjectsRecursive(obj[a]));

        } else {
            console.log(difference[0]);
        }

    }


    //travarseObjectsRecursive(faker)

    let differences = Object.keys(faker).filter(x => !getMethods(faker).includes(x));

    console.log(differences);
    console.log(differences.length)

    differences.map(a => console.log(faker[a]));

    //console.log(Object.keys(faker[differences[2]]).filter(x => !getMethods(faker[differences[0]]).includes(x)))

    // kaldığın yer, üst node prop olacak alt node method ona göre fonksiyon yaz prop içinde itararate et ama fonksiyonları ekle

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );


    return (

        <>
            <Grid>
                <p>seç tipini   </p>
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpanded={['root']}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    {renderTree(data)}
                </TreeView>

            </Grid>
            <Grid>
                <Card  >
                    <CardContent >
                        <CardHeader title="Design Your Json Format" />

                        <Input placeholder="birinci" >
                        </Input>
                        <Button aria-controls="simple-menu" aria-haspopup="true" >
                            Open Menu
                        </Button>
                    </CardContent>
                    <CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Clear
                            </Button>
                            <Button size="small" color="primary">
                                Visiualize
                            </Button>
                        </CardActions>
                    </CardActionArea>
                </Card>
            </Grid>
        </>


    )
}

export default JsonInputs
