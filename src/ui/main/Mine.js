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
  Button,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import MColors from "../../resources/colors/Colors";
import { MBaseComponent } from "react-native-mint-components";
import { InfoType } from "../../redux/action/MineAction";
import storage from "../../utils/RNAsyncStorage";
class Mine extends Component {
  constructor() {
    super();
    this.state = {};
  }
  _save() {
    storage("info", "你好");
  }
  render() {
    const { getInfo, info } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.head_bg} />
        <View style={styles.info_container} />
        <View style={styles.item_conatiner}>
          <Button title="存储" onPress={() => this._save()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0"
  },
  head_bg: {
    height: 120,
    backgroundColor: MColors.authOnGoing,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  info_container: {
    height: 100,
    width: "80%",
    marginRight: 20,
    marginLeft: 20,
    position: "absolute",
    marginTop: 60,
    backgroundColor: MColors.white,
    borderRadius: 8,
    alignSelf: "center"
  },
  item_conatiner: {
    marginTop: 40
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
