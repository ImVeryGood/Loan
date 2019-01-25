/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import LNavigation from "./src/navigation/LNavigation";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store/ConfigStore";
import { PersistGate } from "redux-persist/integration/react";
type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
  }
  onBeforeLift = () => {
    // take some action before the gate lifts
  };
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={this.onBeforeLift()} persistor={persistor}>
          <LNavigation />
        </PersistGate>
      </Provider>
    );
  }
}
