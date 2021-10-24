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


    const data = {
        id: 'root',
        name: 'DataType',
        label: 'Data Type',
        children: [
            {
                id: "0",
                name: 'random',
                label: "Random",
                children: [
                    {
                        id: "1",
                        name: 'number',
                        label: "Number",

                    },
                    {
                        id: "2",
                        name: 'float',
                        label: "Float",
                    },
                    {
                        id: "3",
                        name: 'uuid',
                        label: "Universally Unique ID",
                    },
                    {
                        id: "4",
                        name: 'boolean',
                        label: "Boolean",
                    },
                    {
                        id: "5",
                        name: 'word',
                        label: 'Word',
                    },
                    {
                        id: "6",
                        name: 'words',
                        label: 'Words',

                    },
                    {
                        id: "7",
                        name: 'image',
                        label: 'Image',
                    },
                    {
                        id: "8",
                        name: 'locale',
                        label: 'Locale',
                    },
                    {
                        id: "9",
                        name: 'alpha',
                        label: 'Alpha',
                    },
                    {
                        id: "10",
                        name: 'alphaNumeric',
                        label: 'Alpha Numerical',
                    },
                    {
                        id: "11",
                        name: 'hexaDecimal',
                        label: 'Hexa Decimal',
                    },
                ],
            },
            {
                id: "12",
                name: 'date',
                label: 'Date',
                children: [
                    {
                        id: '13',
                        name: 'past',
                        label: 'Past',
                    },
                    {
                        id: '14',
                        name: 'future',
                        label: 'Future',
                    },
                    {
                        id: '15',
                        name: 'soon',
                        label: 'Soon',
                    },
                    {
                        id: '16',
                        name: 'month',
                        label: 'Month',
                    },
                    {
                        id: '17',
                        name: 'weekday',
                        label: 'Weekday',
                    },

                ],
            },
            {
                id: "18",
                name: 'lorem',
                label: 'Lorem',
                children: [
                    {
                        id: '19',
                        name: 'word',
                        label: 'Word',
                    },
                    {
                        id: '20',
                        name: 'words',
                        label: 'words',
                    },
                    {
                        id: '21',
                        name: 'sentence',
                        label: 'Sentence',
                    },
                    {
                        id: '22',
                        name: 'slug',
                        label: 'Slug',
                    },
                    {
                        id: '23',
                        name: 'sentences',
                        label: 'Senteces',
                    },
                    {
                        id: '24',
                        name: 'paragraph',
                        label: 'Paragraph',
                    },
                    {
                        id: '25',
                        name: 'paragraphs',
                        label: 'Paragraphs',
                    },
                    {
                        id: '26',
                        name: 'text',
                        label: 'Texts',
                    },

                ],
            },
            {
                id: "27",
                name: 'name',
                label: 'Name',
                children: [
                    {
                        id: '28',
                        name: 'firstName',
                        label: 'First Name',
                    },
                    {
                        id: '29',
                        name: 'lastName',
                        label: 'Last Name',
                    },
                    {
                        id: '30',
                        name: 'middleName',
                        label: 'Middle Name',
                    },
                    {
                        id: '31',
                        name: 'prefix',
                        label: 'Prefix',
                    },
                    {
                        id: '32',
                        name: 'suffix',
                        label: 'Suffix',
                    },
                    {
                        id: '33',
                        name: 'title',
                        label: 'Title',
                    },
                    {
                        id: '34',
                        name: 'jobDescriptor',
                        label: 'Job Descriptor',
                    },
                    {
                        id: '35',
                        name: 'jobArea',
                        label: 'Job Area',
                    },
                    {
                        id: '36',
                        name: 'jobType',
                        label: 'Job Type',
                    },

                ],
            },
        ],
    };

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
