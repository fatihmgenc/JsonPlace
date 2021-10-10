import React from 'react';
import { useState } from 'react';
import { Card, Input, CardHeader, CardContent, CardActionArea, CardActions, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


const JsonInputs = () => {


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


    const data = {
        id: 'root',
        name: 'DataType',
        children: [
            {
                id: "0",
                name: 'random',
                children: [
                    {
                        id: "1",
                        name: 'number',
                    },
                    {
                        id: "2",
                        name: 'float',
                    },
                    {
                        id: "3",
                        name: 'uuid',
                    },
                    {
                        id: "4",
                        name: 'boolean',
                    },
                    {
                        id: "5",
                        name: 'word',
                    },
                    {
                        id: "6",
                        name: 'words',
                    },
                    {
                        id: "7",
                        name: 'image',
                    },
                    {
                        id: "8",
                        name: 'locale',
                    },
                    {
                        id: "9",
                        name: 'alpha',
                    },
                    {
                        id: "10",
                        name: 'alphaNumeric',
                    },
                    {
                        id: "11",
                        name: 'hexaDecimal',
                    },
                ],
            },
            {
                id: "12",
                name: 'Date',
                children: [
                    {
                        id: '13',
                        name: 'Past',
                    },
                    {
                        id: '14',
                        name: 'future',
                    },
                    {
                        id: '15',
                        name: 'soon',
                    },
                    {
                        id: '16',
                        name: 'month',
                    },
                    {
                        id: '17',
                        name: 'weekday',
                    },

                ],
            },
            {
                id: "18",
                name: 'lorem',
                children: [
                    {
                        id: '19',
                        name: 'word',
                    },
                    {
                        id: '20',
                        name: 'words',
                    },
                    {
                        id: '21',
                        name: 'sentence',
                    },
                    {
                        id: '22',
                        name: 'slug',
                    },
                    {
                        id: '23',
                        name: 'sentences',
                    },
                    {
                        id: '24',
                        name: 'paragraph',
                    },
                    {
                        id: '25',
                        name: 'paragraphs',
                    },
                    {
                        id: '26',
                        name: 'text',
                    },

                ],
            },
            {
                id: "27",
                name: 'name',
                children: [
                    {
                        id: '28',
                        name: 'firstName',
                    },
                    {
                        id: '29',
                        name: 'LastName',
                    },
                    {
                        id: '30',
                        name: 'middleName',
                    },
                    {
                        id: '31',
                        name: 'prefix',
                    },
                    {
                        id: '32',
                        name: 'suffix',
                    },
                    {
                        id: '33',
                        name: 'title',
                    },
                    {
                        id: '34',
                        name: 'jobDescriptor',
                    },
                    {
                        id: '35',
                        name: 'jobArea',
                    },
                    {
                        id: '36',
                        name: 'jobType',
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


    //console.log(Object.keys(faker), "keys")

    //travarseObjectsRecursive(faker)
    //let differences = Object.keys(faker).filter(x => !getMethods(faker).includes(x));
    //console.log(Object.keys(faker[differences[2]]).filter(x => !getMethods(faker[differences[0]]).includes(x)))
    // kaldığın yer, üst node prop olacak alt node method ona göre fonksiyon yaz prop içinde itararate et ama fonksiyonları ekle

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={!Array.isArray(nodes.children) ? () => setTypeSelectionName(nodes.name) : () => setParentTypeSelectionName(nodes.name)} >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );


    const pushPropToJson = () => {
        let temp = sampleJson;
        console.log(parentTypeSelectionName, typeSelectionName);

        Reflect.set(temp, propName, faker[parentTypeSelectionName][typeSelectionName]())
        console.log(temp)
    }


    return (

        <>
            <Grid>
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
