import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { Card, Input, CardHeader, CardContent, CardActions, Button, Grid, Modal } from '@material-ui/core';
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
import { GreeterClient } from "../protos/greet_grpc_web_pb";
import { HelloRequest } from "../protos/greet_pb";
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
    var client = new GreeterClient('http://localhost:8080');
    var helloRequest = new HelloRequest();

    useEffect(() => {
        helloRequest.setName('Fatih Muhammed Genç');
        var response = client.sayHelloButReverse(helloRequest, { "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRlc3QxIiwibmJmIjoxNjQxMDQyNTg3LCJleHAiOjE2NDEwNTMzODcsImlhdCI6MTY0MTA0MjU4N30.sd7a-CeF-6fJcBp0opIepxmBr9T72BcmfralQUxYjLI" }, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                console.log(response.getMessage());
            }
        });
    }, [])


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
            if (nodes.parentName == "random" && nodes.name == "number") {
                console.log("GİRDİİİ");
                setIsMinConst(true);
                setIsMinConst(true);
            }
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
        console.log(parentTypeSelectionName, typeSelectionName, "xxx");
        if (parentTypeSelectionName == "random" && typeSelectionName == "number") {
            Reflect.set(contextState.json, propName, faker[parentTypeSelectionName][typeSelectionName]({ min: Number.parseInt(minConst), max: Number.parseInt(maxConst) }))
        } else {
            Reflect.set(contextState.json, propName, faker[parentTypeSelectionName][typeSelectionName]())
        }
        contextStateActions.jsonChanged(contextState.json)
        contextStateActions.typesArrayChanged([...contextState.typeArray, { propName, typeSelectionName, parentTypeSelectionName }]);
    }



    return (
        <Grid container spacing={1}  >
            <Grid item xs={12} md={6} lg={6} >
                <Card>
                    <CardHeader title={`1 - Datatype`} />
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
                        <CardHeader title={`2 - Propname`} />
                        <Input disabled={!typeSelectionName} placeholder={typeSelectionName ? "Prop Name" : "Select Variable Type"} onChange={(e) => setPropName(e.target.value)}></Input>
                        {isMinConst && <Input type="number" placeholder={`Minimum value`} onChange={(e) => setMinConst(e.target.value)} />}
                        <Button style={{ marginTop: 10, marginLeft: 40 }} variant="outlined" color="primary" disabled={!(propName && typeSelectionName)} endIcon={<Add />} onClick={() => pushPropToJson()} > Add </Button>
                    </CardContent>
                    <CardActions style={{ backgroundColor: 'whitesmoke' }} >
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
