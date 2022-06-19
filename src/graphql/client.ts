import {ApolloClient, InMemoryCache, ApolloProvider,useQuery, gql} from '@apollo/client'

export const client = new ApolloClient({
    uri: 'https://localhost:44303/graphql',
    cache: new InMemoryCache()
});