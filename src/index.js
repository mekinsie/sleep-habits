import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import './css/blob.scss';
import './css/stars.scss';
import App from './components/App';
import {createStore} from 'redux';
import rootReducer from './reducers/index.js';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "./firebase";
import 'firebase/auth'

const store = createStore(rootReducer);

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

// store.subscribe(() => {
//   console.log(store.getState())
// })

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

