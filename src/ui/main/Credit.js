import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  AppRegistry,
  ScrollView,
  Image,
  StatusBar
} from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Credit!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
