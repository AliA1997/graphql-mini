import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import  gql  from 'graphql-tag';
import './index.css'


const client = new ApolloClient({
    uri: 'http://localhost:3050/graphql'
})

//Exampleo of a query template literal
//ues query..
// client.query({
//     query: gql`
//     {
//         people {
//             name
//         }
//     }`
// }).then(res => console.log(res.data));

ReactDOM.render( 
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, document.getElementById('root')
)