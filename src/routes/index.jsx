
import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from '../components/App';

// Webpack 2 supports ES2015 `import()` by auto-
// chunking assets. Check out the following for more:
// https://webpack.js.org/guides/migrating/#code-splitting-with-es2015

const importGame = (nextState, cb) => {
  import('../components/Game')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};

const importSettings = (nextState, cb) => {
  import('../components/Settings')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e; });
};


// We use `getComponent` to dynamically load routes.
// https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
const routes = (
  <Route path='/' component={App}>
    <IndexRoute getComponent={importGame} />
    <Route path='settings' getComponent={importSettings} />
  </Route>
);

// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if(module.hot) {
  require('../components/Game');    // eslint-disable-line global-require
  require('../components/Settings');    // eslint-disable-line global-require
}

export default routes;
