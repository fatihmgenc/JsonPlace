import React from 'react'

const ApplicationVariables = {
    BaseAdress: 'https://localhost:7005',
    //note to myslf: non-secure http only works throught envoy proxy, not aspnet-grpc-web. http2 to http is not valid but https.   
    //BaseAdress: 'http://localhost:5005',
    //BaseAdress: 'http://localhost:8080',
    //BaseAdress: 'http://iphere:8080',
}

export default ApplicationVariables