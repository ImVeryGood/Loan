/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";
import LNavigation from "./src/navigation/LNavigation";
import { Provider } from "react-redux";
import store, { persistor } from "./src/redux/store/ConfigStore";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <LNavigation />
      </Provider>
    );
  }
}
