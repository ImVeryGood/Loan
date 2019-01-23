import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Home from "../ui/main/Home";
import React from "react";
import { Image, StyleSheet } from "react-native";
import Credit from "../ui/main/Credit";
import Mine from "../ui/main/Mine";

export const tabBottom = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
        tabBarLabel: "首页",
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return (
              <Image
                style={styles.tabBarIcon}
                source={require("../../src/resources/image/ic_tab_home_blue.png")}
              />
            );
          }
          return (
            <Image
              style={styles.tabBarIcon}
              source={require("../../src/resources/image/ic_tab_home_gray.png")}
            />
          );
        }
      }
    },
    Credit: {
      screen: Credit,
      navigationOptions: {
        header: null,
        tabBarLabel: "授信",
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return (
              <Image
                style={styles.tabBarIcon}
                source={require("../../src/resources/image/ic_tab_credit_blue.png")}
              />
            );
          }
          return (
            <Image
              style={styles.tabBarIcon}
              source={require("../../src/resources/image/ic_tab_credit_gray.png")}
            />
          );
        }
      }
    },
    Mine: {
      screen: Mine,
      navigationOptions: {
        header: null,
        tabBarLabel: "我的",
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return (
              <Image
                style={styles.tabBarIcon}
                source={require("../../src/resources/image/ic_tab_mine_blue.png")}
              />
            );
          }
          return (
            <Image
              style={styles.tabBarIcon}
              source={require("../../src/resources/image/ic_tab_mine_gray.png")}
            />
          );
        }
      }
    }
  },
  {
    initialRouteName: "Home",
    swipeEnabled: true,
    indicatorStyle: { height: 0 }
  }
);
const app = createStackNavigator({
  Main: {
    screen: tabBottom,
    navigationOptions: {
      header: null,
      indicatorStyle: { height: 0 }
    }
  }
});
export default createAppContainer(app);
const styles = StyleSheet.create({
  tabBarIcon: {
    width: 15,
    height: 15
  }
});
