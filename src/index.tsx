import React from 'react';
import App from './App'
import {Provider} from 'react-redux'
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import EditTask from "./components/EditTask";
import CategoriesList from "./components/CategoriesList";
import EditCategory from "./components/EditCategory";
import Header from './components/Header'
import {client} from './graphql/client'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import {store} from './store/store'

const rootElement = document.getElementById('root');
if (rootElement === null) throw new Error('Root container missing index.html');
const root = createRoot(rootElement);
root.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/edit-task/:taskId" element={<EditTask/>}/>
                    <Route path="/categories" element={<CategoriesList/>}/>
                    <Route path="categories/edit-category/:categoryId" element={<EditCategory/>}/>
                </Routes>
            </Router>
        </ApolloProvider>
    </Provider>
);
