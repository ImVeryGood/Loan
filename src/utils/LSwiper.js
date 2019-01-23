import { Image, TouchableOpacity } from "react-native";
import React from "react";

export const LSwiper = banner_arr => {
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
};
