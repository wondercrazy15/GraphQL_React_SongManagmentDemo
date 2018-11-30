import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import SongList from './components/SongList'
import App from './components/App';
import SongCreate from './components/SongCreate'
import SongDetails from './components/SongsDetails'
import SongEdit from './components/SongEdit'
import LyricEdit from './components/LyricEdit'

const client = new ApolloClient({

  dataIdFromObject: o => o.id
});

const Root = () => {

  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList}></IndexRoute>
          <Route path="songs/new" component={SongCreate}></Route>
          <Route path="songs/:id" component={SongDetails}></Route>
          <Route path="songs/edit/:id" component={SongEdit}></Route>
          <Route path="lyrics/edit/:id" component={LyricEdit}></Route>

        </Route>
      </Router>
    </ApolloProvider>
  );

};
ReactDOM.render(
  <Root></Root>,
  document.querySelector('#root')
);

