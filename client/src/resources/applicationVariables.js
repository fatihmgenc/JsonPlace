const ApplicationVariables = {
    BaseAdress: 'https://jsonplace.com:4423',
    //note to myslf: non-secure http only works throught envoy proxy, not aspnet-grpc-web. http2 to http is not valid but https.   
    //BaseAdress: 'http://localhost:5005',
    //BaseAdress: 'http://localhost:8080',
    //BaseAdress: 'https://localhost:8080',
}

export default ApplicationVariables