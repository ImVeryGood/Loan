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
import { getBannerList, getMoneySaga } from "../../redux/action/HomeAction";
import indexActions from "../../redux/action/indexActions";
import { connect } from "react-redux";
import MColors from "../../resources/colors/Colors";
import { MBaseComponent } from "react-native-mint-components";
import { bindActionCreators } from "redux";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      moneyCheckedIndex: 0,
      dayCheckedIndex: 0
    };
  }
  componentDidMount() {
    this.props.actions.getBannerList();
    this.props.actions.getMoneySaga();
  }
  _renderSwiper(banner_arr) {
    let itemArr = [];
    let dataArr = banner_arr;
    for (let i = 0; i < dataArr.length; i++) {
      let pic = {
        uri: dataArr[i].imgUrl
      };
      itemArr.push(
        <TouchableOpacity key={i}>
          <Image source={pic} style={styles.banner_image} />
        </TouchableOpacity>
      );
    }
    return itemArr;
  }
  _dayItem(item, index) {
    const { setDateChecked } = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            dayCheckedIndex: index
          })
        }
      >
        <View
          style={
            this.state.dayCheckedIndex == index
              ? styles.date_checked
              : styles.date_container
          }
        >
          <Text style={styles.day}>{item.period}日</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _moneyItem(item, index) {
    const { setMoneyChecked } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.setState({
            moneyCheckedIndex: index
          })
        }
      >
        <View
          style={
            this.state.moneyCheckedIndex == index
              ? styles.money_item_checked
              : styles.money_item__no_check
          }
        >
          <View style={styles.money_item}>
            <Text style={styles.money_info}> 借款（元）</Text>
            <Text style={styles.money_number}>{item}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { banner_arr, money_arr, day_arr } = this.props;
    return (
      <ScrollView style={styles.container}>
        <StatusBar
          backgroundColor="#ff0000"
          translucent={true}
          hidden={true}
          animated={true}
        />
        <View style={styles.swiper}>
          <Swiper autoplay={false}>{this._renderSwiper(banner_arr)}</Swiper>
        </View>
        <View style={styles.container_title}>
          <Text style={styles.no_text} />
          <Text style={styles.title}>申请金额</Text>
        </View>
        <FlatList
          horizontal={true}
          data={money_arr}
          extraData={this.state}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flat_list}
          renderItem={({ item, index }) => this._moneyItem(item, index)}
        />
        <View style={styles.container_title}>
          <Text style={styles.no_text} />
          <Text style={styles.title}>使用期限</Text>
        </View>
        <FlatList
          horizontal={true}
          data={day_arr}
          style={styles.flat_list}
          extraData={this.state}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => this._dayItem(item, index)}
        />
        <TouchableOpacity>
          <Text style={styles.loan_money}>立即借款</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },
  swiper: {
    height: 180
  },
  banner_image: {
    height: 180
  },
  container_title: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  no_text: {
    height: 10,
    width: 3,
    backgroundColor: MColors.authOnGoing
  },
  title: {
    color: MColors.black,
    marginLeft: 3
  },
  flat_list: {
    marginTop: 10,
    maxHeight: 80
  },
  money_item_checked: {
    marginLeft: 8,
    backgroundColor: MColors.authOnGoing,
    borderRadius: 8,
    maxHeight: 80,
    color: MColors.white,
    alignItems: "center"
  },
  money_item__no_check: {
    marginLeft: 8,
    backgroundColor: MColors.white,
    borderRadius: 8,
    maxHeight: 80,
    color: MColors.black,
    alignItems: "center"
  },
  money_item: {
    alignItems: "center",
    margin: 15
  },
  date_checked: {
    alignItems: "center",
    backgroundColor: MColors.authOnGoing,
    marginLeft: 8,
    borderRadius: 8
  },
  date_container: {
    alignItems: "center",
    backgroundColor: MColors.white,
    marginLeft: 8,
    borderRadius: 8
  },
  day: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 25,
    marginRight: 25
  },
  loan_money: {
    height: 35,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 40,
    lineHeight: 35,
    borderRadius: 10,
    backgroundColor: MColors.authOnGoing,
    textAlign: "center",
    color: MColors.white
  }
});
const mapStateToProps = state => {
  //alert("home" + JSON.stringify(state.HomeReducer.get("day")));
  return {
    banner_arr: state.HomeReducer.get("banner"),
    money_arr: state.HomeReducer.get("money"),
    day_arr: state.HomeReducer.get("day")
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(indexActions, dispatch)
  };
};
module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
