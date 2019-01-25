export const GetBannerList = "getBannerLists";
export const GetBannerList_saga = "getBannerList_saga";
export const GetMoneyList_saga = "getMoneyList_saga";
export const GetMoneyList = "getMoneyList";
export const GetDayList = "getDayList";
export const GetDayList_saga = "getDayList_saga";
export const SetMoneyChecked_saga = "setMoneyChecked_saga";
export const SetMoneyChecked = "setMoneyChecked";
export const SetDateChecked = "SetDateChecked";
export const SetDateChecked_saga = "SetDateChecked_saga";
const getBannerList = () => {
  return {
    type: GetBannerList_saga
  };
};
const getMoneySaga = () => {
  return {
    type: GetMoneyList_saga
  };
};

export const homeAction = {
  getBannerList,
  getMoneySaga
};
