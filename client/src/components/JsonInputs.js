import React, { useRef } from 'react';
import { useState, useContext } from 'react';
import { Card, Input, CardHeader, CardContent, CardActions, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import { Add, ExpandMore, ChevronRight, RemoveOutlined } from '@material-ui/icons';
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
    const [isMinConst, setIsMinConst] = useState(false);
    const [isMaxConst, setIsMaxConst] = useState(false);
    const [minConst, setMinConst] = useState("");
    const [maxConst, setMaxConst] = useState("");

    const treeRef = useRef();

    const handleTreeItemClick = (nodes) => {

        // selected is parent
        if (Array.isArray(nodes.children)) {
            setParentTypeSelectionName(nodes.name)
            setTypeSelectionName("")
        }
        // selected is chlld node
        else {
            setParentTypeSelectionName(nodes.parentName)
            setTypeSelectionName(nodes.name)
        }
    }


    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.label} onClick={() => handleTreeItemClick(nodes)} >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    const clearData = () => {
        contextStateActions.jsonChanged({})
        contextStateActions.typesArrayChanged([]);
    }
    const pushPropToJson = () => {
        Reflect.set(contextState.json, propName, faker[parentTypeSelectionName]?.[typeSelectionName]())
        contextStateActions.jsonChanged(contextState.json)
        contextStateActions.typesArrayChanged([...contextState.typeArray, { propName, typeSelectionName, parentTypeSelectionName }]);
    }

    return (
        <Grid container spacing={1}  >
            <Grid item xs={12} md={6} lg={6} >
                <Card  >
                    <CardHeader title={`1 - Datatype`} />
                    <CardContent style={{ height: '100%' }} >
                        <ScrollView style={{ height: `${50}vh` }} >
                            <TreeView
                                ref={treeRef}
                                className={classes.root}
                                defaultCollapseIcon={<ExpandMore />}
                                defaultExpanded={['root']}
                                defaultExpandIcon={<ChevronRight />}
                            >
                                {renderTree(data)}
                            </TreeView>


                        </ScrollView>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}  >
                <Card >
                    <CardHeader title={`2 - Propname`} />
                    <CardContent  >
                        <Grid container spacing={1} >
                            <Grid item xs={12} md={6} lg={6} >
                                <Input disabled={!typeSelectionName}
                                    placeholder={typeSelectionName ? "Prop Name" : "Select Variable Type"}
                                    onChange={(e) => setPropName(e.target.value)}></Input>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6} >
                                <Button
                                    variant="outlined" color="primary"
                                    disabled={!(propName && typeSelectionName)}
                                    endIcon={<Add />}
                                    onClick={() => pushPropToJson()} > Add </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{ backgroundColor: 'whitesmoke' }} >
                        <Button style={{ margin: 'auto' }}
                            variant="contained"
                            color="secondary"
                            endIcon={<RemoveOutlined />}
                            onClick={() => clearData()}>
                            Clear All
                        </Button>

                    </CardActions>
                </Card>
            </Grid>
        </Grid >


    )
}

export default JsonInputs
