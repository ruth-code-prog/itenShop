import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {Provider} from 'react-redux';
import store from './reducers/store';
import codePush from "react-native-code-push";

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
}

export default codePush(App);
