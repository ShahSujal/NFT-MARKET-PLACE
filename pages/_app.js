import '../styles/globals.css'
import NavBar from '../pages/other/NavBar'
import Context from '../context/Context'
import { useState,useEffect } from 'react';
import { ApolloProvider,ApolloClient,InMemoryCache } from '@apollo/client';
import {useRouter } from 'next/router';

import DataContext from '../context/DataContext';



export default function App({ Component, pageProps }) {
  const router = useRouter()
  const client = new ApolloClient({ cache: new InMemoryCache(), uri:"https://api.studio.thegraph.com/query/44934/polygon-nft/v0.0.1",headers:{'Access-Control-Allow-Origin':'*'} });
 
  return<Context>
  <ApolloProvider client={client}>
<DataContext>
  {router.route == '/validation/Login'?<></>:<NavBar/>}
  <Component {...pageProps} />

</DataContext>
 

  
  </ApolloProvider>
  </Context> 
}
