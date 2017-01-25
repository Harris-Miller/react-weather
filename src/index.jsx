import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './containers/app';
import Index from './containers/index';
import Forecast from './containers/forecast';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

require('./style.less');

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="/forecast" component={Forecast} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
