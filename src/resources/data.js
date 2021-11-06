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
                    parentName: "random"

                },
                {
                    id: "2",
                    name: 'float',
                    label: "Float",
                    parentName: "random"
                },
                {
                    id: "3",
                    name: 'uuid',
                    label: "Universally Unique ID",
                    parentName: "random"
                },
                {
                    id: "4",
                    name: 'boolean',
                    label: "Boolean",
                    parentName: "random"
                },
                {
                    id: "5",
                    name: 'word',
                    label: 'Word',
                    parentName: "random"
                },
                {
                    id: "6",
                    name: 'words',
                    label: 'Words',
                    parentName: "random"
                },
                {
                    id: "7",
                    name: 'image',
                    label: 'Image',
                    parentName: "random"
                },
                {
                    id: "8",
                    name: 'locale',
                    label: 'Locale',
                    parentName: "random"
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
                    parentName: "random",
                },
                {
                    id: "11",
                    name: 'hexaDecimal',
                    label: 'Hexa Decimal',
                    parentName: "random"
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
                    parentName: "date"
                },
                {
                    id: '14',
                    name: 'future',
                    label: 'Future',
                    parentName: "date"
                },
                {
                    id: '15',
                    name: 'soon',
                    label: 'Soon',
                    parentName: "date"
                },
                {
                    id: '16',
                    name: 'month',
                    label: 'Month',
                    parentName: "date"
                },
                {
                    id: '17',
                    name: 'weekday',
                    label: 'Weekday',
                    parentName: "date"
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
                    parentName: "lorem"
                },
                {
                    id: '20',
                    name: 'words',
                    label: 'Words',
                    parentName: "lorem"
                },
                {
                    id: '21',
                    name: 'sentence',
                    label: 'Sentence',
                    parentName: "lorem"
                },
                {
                    id: '22',
                    name: 'slug',
                    label: 'Slug',
                    parentName: "lorem"
                },
                {
                    id: '23',
                    name: 'sentences',
                    label: 'Senteces',
                    parentName: "lorem"
                },
                {
                    id: '24',
                    name: 'paragraph',
                    label: 'Paragraph',
                    parentName: "lorem"
                },
                {
                    id: '25',
                    name: 'paragraphs',
                    label: 'Paragraphs',
                    parentName: "lorem"
                },
                {
                    id: '26',
                    name: 'text',
                    label: 'Texts',
                    parentName: "lorem"
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
                    parentName: "name"
                },
                {
                    id: '29',
                    name: 'lastName',
                    label: 'Last Name',
                    parentName: "name"
                },
                {
                    id: '30',
                    name: 'middleName',
                    label: 'Middle Name',
                    parentName: "name"
                },
                {
                    id: '31',
                    name: 'prefix',
                    label: 'Prefix',
                    parentName: "name"
                },
                {
                    id: '32',
                    name: 'suffix',
                    label: 'Suffix',
                    parentName: "name"
                },
                {
                    id: '33',
                    name: 'title',
                    label: 'Title',
                    parentName: "name"
                },
                {
                    id: '34',
                    name: 'jobDescriptor',
                    label: 'Job Descriptor',
                    parentName: "name"
                },
                {
                    id: '35',
                    name: 'jobArea',
                    label: 'Job Area',
                    parentName: "name"
                },
                {
                    id: '36',
                    name: 'jobType',
                    label: 'Job Type',
                    parentName: "name"
                },

            ],
        },
    ],
};

export default data;