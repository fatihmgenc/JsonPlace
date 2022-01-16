const ReadyTemplates =
    [{
        title: "User Employee", description: "Describes an example employee using the system",
        typeArray: [{ "propName": "Id", "typeSelectionName": "uuid", "parentTypeSelectionName": "random" },
        { "propName": "ProfilePicture", "typeSelectionName": "image", "parentTypeSelectionName": "random" },
        { "propName": "RegisterDate", "typeSelectionName": "past", "parentTypeSelectionName": "date" },
        { "propName": "BirthDate", "typeSelectionName": "past", "parentTypeSelectionName": "date" },
        { "propName": "NextAssigment", "typeSelectionName": "future", "parentTypeSelectionName": "date" },
        { "propName": "Description", "typeSelectionName": "words", "parentTypeSelectionName": "lorem" },
        { "propName": "FirstName", "typeSelectionName": "firstName", "parentTypeSelectionName": "name" },
        { "propName": "LastName", "typeSelectionName": "lastName", "parentTypeSelectionName": "name" },
        { "propName": "Job", "typeSelectionName": "jobDescriptor", "parentTypeSelectionName": "name" },
        { "propName": "JobType", "typeSelectionName": "jobType", "parentTypeSelectionName": "name" },
        { "propName": "Firm", "typeSelectionName": "companyName", "parentTypeSelectionName": "company" },
        { "propName": "EmailAddress", "typeSelectionName": "email", "parentTypeSelectionName": "internet" },
        { "propName": "Username", "typeSelectionName": "userName", "parentTypeSelectionName": "internet" },
        { "propName": "Password", "typeSelectionName": "password", "parentTypeSelectionName": "internet" },
        { "propName": "BankAccount", "typeSelectionName": "accountName", "parentTypeSelectionName": "finance" },
        { "propName": "BankAccountNumber", "typeSelectionName": "iban", "parentTypeSelectionName": "finance" },
        { "propName": "PreferedCurrency", "typeSelectionName": "currencyName", "parentTypeSelectionName": "finance" },
        { "propName": "PreferedCurrencyCode", "typeSelectionName": "currencyCode", "parentTypeSelectionName": "finance" }]
    },

    {
        title: "Purchased Vehicle", description: "Describes details of purchased vehicle",
        typeArray: [{ "propName": "Id", "typeSelectionName": "uuid", "parentTypeSelectionName": "random" },
        { "propName": "Fuel", "typeSelectionName": "fuel", "parentTypeSelectionName": "vehicle" },
        { "propName": "Type", "typeSelectionName": "type", "parentTypeSelectionName": "vehicle" },
        { "propName": "Model", "typeSelectionName": "vehicle", "parentTypeSelectionName": "vehicle" },
        { "propName": "Description", "typeSelectionName": "sentence", "parentTypeSelectionName": "lorem" },
        { "propName": "ProductionNumber", "typeSelectionName": "number", "parentTypeSelectionName": "random" },
        { "propName": "ProductionNumber", "typeSelectionName": "number", "parentTypeSelectionName": "random" },
        { "propName": "LaunchDate", "typeSelectionName": "past", "parentTypeSelectionName": "date" },
        { "propName": "GuaranteeDate", "typeSelectionName": "future", "parentTypeSelectionName": "date" },
        { "propName": "Designer", "typeSelectionName": "lastName", "parentTypeSelectionName": "name" },
        { "propName": "Manifacturer", "typeSelectionName": "manufacturer", "parentTypeSelectionName": "vehicle" },
        { "propName": "OwnerName", "typeSelectionName": "firstName", "parentTypeSelectionName": "name" },
        { "propName": "OwnerLastName", "typeSelectionName": "lastName", "parentTypeSelectionName": "name" },
        { "propName": "Marker", "typeSelectionName": "avatar", "parentTypeSelectionName": "internet" },
        { "propName": "InvoiceDate", "typeSelectionName": "past", "parentTypeSelectionName": "date" },
        { "propName": "HorsePower", "typeSelectionName": "float", "parentTypeSelectionName": "random" }]
    },
    { title: "Template Title", description: "bbbbbbbb" }];


export default ReadyTemplates;