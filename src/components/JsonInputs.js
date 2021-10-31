import React from 'react';
import { useState, useContext } from 'react';
import { Card, Input, CardHeader, CardContent, CardActionArea, CardActions, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Add from '@material-ui/icons/Add';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import TreeItem from '@material-ui/lab/TreeItem';
import { JsonContext } from '../context/jsonContext';
import { ScrollView } from "@cantonjs/react-scroll-view";
import data from "../resources/data"
const JsonInputs = () => {

    var faker = require('faker');
    const { contextState, contextStateActions } = useContext(JsonContext)

    const useStyles = makeStyles({
        root: {
            height: 110,
            flexGrow: 1,
        },
    });

    const classes = useStyles();

    const [typeSelectionName, setTypeSelectionName] = useState("")
    const [parentTypeSelectionName, setParentTypeSelectionName] = useState("")
    const [propName, setPropName] = useState("")

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.label} onClick={!Array.isArray(nodes.children) ? () => setTypeSelectionName(nodes.name) : () => setParentTypeSelectionName(nodes.name)} >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    const clearData = () => {
        contextStateActions.jsonChanged({})
        contextStateActions.typesArrayChanged([]);
    }
    const pushPropToJson = () => {
        Reflect.set(contextState.json, propName, faker[parentTypeSelectionName][typeSelectionName]())
        contextStateActions.jsonChanged(contextState.json)
        contextStateActions.typesArrayChanged([...contextState.typeArray, { propName, typeSelectionName, parentTypeSelectionName }]);
    }


    return (
        <Grid container spacing={1}  >

            <Grid item style={{ padding: 5 }} xs={12} md={6} lg={6} >
                <Card>
                    <ScrollView style={{ height: '60vh' }}  >
                        <TreeView
                            className={classes.root}
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpanded={['root']}
                            defaultExpandIcon={<ChevronRightIcon />}
                        >
                            {renderTree(data)}
                        </TreeView>

                    </ScrollView>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}  >
                <Card >
                    <CardContent  >
                        <CardHeader title={`Constrains`} />
                        <Input disabled={!typeSelectionName} placeholder={typeSelectionName ? "Prop Name" : "Select Variable Type"} onChange={(e) => setPropName(e.target.value)}></Input>
                        <Button style={{ marginTop: 10, marginLeft: 40 }} variant="outlined" color="primary" disabled={!(propName && typeSelectionName)} endIcon={<Add />} onClick={() => pushPropToJson()} > Add </Button>
                    </CardContent>
                    <CardActions >
                        <Button style={{ margin: 'auto' }} variant="contained" color="secondary" endIcon={<DeleteRounded />} onClick={() => clearData()}>
                            Clear All
                        </Button>

                    </CardActions>
                </Card>
            </Grid>
        </Grid>


    )
}

export default JsonInputs
