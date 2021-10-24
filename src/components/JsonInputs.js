import React from 'react';
import { useState, useContext } from 'react';
import { Card, Input, CardHeader, CardContent, CardActionArea, CardActions, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { JsonContext } from '../context/jsonContext';
import { ScrollView } from "@cantonjs/react-scroll-view";
import data from "../resources/data"
const JsonInputs = () => {

    const { jsonState, jsonActions } = useContext(JsonContext)

    const useStyles = makeStyles({
        root: {
            height: 110,
            flexGrow: 1,
            maxWidth: 400,
        },
    });

    const classes = useStyles();

    const [typeSelectionName, setTypeSelectionName] = useState("")
    const [parentTypeSelectionName, setParentTypeSelectionName] = useState("")
    const [propName, setPropName] = useState("")
    const [sampleJson, setSampleJson] = useState({})


    var faker = require('faker');
    faker.random.locale()




    // const getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')

    // const travarseObjectsRecursive = (obj) => {


    //     let difference = Object.keys(obj).filter(x => !getMethods(obj).includes(x));

    //     if (difference.length > 0) {
    //         difference.map(a => travarseObjectsRecursive(obj[a]));

    //     } else {
    //         console.log(difference[0]);
    //     }

    // }


    //console.log(Object.keys(faker), "keys")

    //travarseObjectsRecursive(faker)
    //let differences = Object.keys(faker).filter(x => !getMethods(faker).includes(x));
    //console.log(Object.keys(faker[differences[2]]).filter(x => !getMethods(faker[differences[0]]).includes(x)))
    // kaldığın yer, üst node prop olacak alt node method ona göre fonksiyon yaz prop içinde itararate et ama fonksiyonları ekle

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.label} onClick={!Array.isArray(nodes.children) ? () => setTypeSelectionName(nodes.name) : () => setParentTypeSelectionName(nodes.name)} >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );


    const pushPropToJson = () => {
        let temp = sampleJson;
        console.log(parentTypeSelectionName, typeSelectionName);
        Reflect.set(temp, propName, faker[parentTypeSelectionName][typeSelectionName]())
        jsonActions.jsonStateChanged(sampleJson)
    }


    return (

        <>

            <ScrollView style={{ height: '70vh' }}  >
                <Grid >
                    <TreeView
                        className={classes.root}
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpanded={['root']}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {renderTree(data)}
                    </TreeView>

                </Grid>
            </ScrollView>
            <Grid>
                {typeSelectionName && <Card  >
                    <CardContent >
                        <CardHeader title={`${typeSelectionName} Constrains`} />
                        <Input placeholder="Prop Name" onChange={(e) => setPropName(e.target.value)} >
                        </Input>
                        <p> {propName} </p>
                        <Button variant="contained" onClick={() => pushPropToJson()} > Save </Button>
                    </CardContent>
                    <CardActionArea>
                        <CardActions>
                            <Button size="small" >
                                Clear
                            </Button>
                            <Button size="small" >
                                Visiualize
                            </Button>
                        </CardActions>
                    </CardActionArea>
                </Card>
                }
            </Grid>
        </>


    )
}

export default JsonInputs
