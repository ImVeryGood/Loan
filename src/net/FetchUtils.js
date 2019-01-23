import Mock from "mockjs";
import queryString from "query-string";
import _ from "lodash";
import config from "./config";
import { Alert } from "react-native";

//request是个变量，后面有个{}，它就是一个对象
let request = {};
//设定params json对象
request.get = (url, params) => {
  if (params) {
    url += "?" + queryString.stringify(params);
  }

  //发送网络请求
  return fetch(url)
    .then(response => response.json())
    .then(response => Mock.mock(response));
};

request.post = (props, url, body) => {
  //合并JSON对象
  let map = _.extend(config.map, {
    body: JSON.stringify(body)
  });

  return fetch(url, map)
    .then(response => response.json())
    .then(responseJson => {
      let msg = responseJson.msg;
      switch (msg) {
        case "未登录":
          // showAlert(props);
          break;
      }
    })
    .then(response => Mock.mock(response));
};

module.exports = request;

export function showAlert(props) {
  Alert.alert("提示", "请先登录", [
    { text: "取消" },
    {
      text: "登录",
      onPress: () => props.navigation.navigate("Login")
    }
  ]);
}
