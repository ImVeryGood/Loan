import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  AppRegistry,
  Touchable,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import Swiper from "react-native-swiper";
import { connect } from "react-redux";
import MColors from "../../resources/colors/Colors";
import { MBaseComponent } from "react-native-mint-components";
import { InfoType } from "../../redux/action/MineAction";
class Mine extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { getInfo, info } = this.props;
    return (
      <ScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => getInfo(Math.random() * 5)}>
          <Text>立即借款</Text>
        </TouchableWithoutFeedback>
        <Text>info:{info}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  }
});
const mapStateToProps = state => {
  return {
    info: state.MineReducer.get("info")
  };
};

const mapDispatchToProps = dispatch => ({
  getInfo: text => dispatch(InfoType(text))
});
module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mine);
