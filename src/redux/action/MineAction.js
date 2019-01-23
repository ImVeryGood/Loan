export const Info = "info";
export const Info_saga = "info_saga";
export const InfoType = text => {
  return {
    type: Info_saga,
    info: text
  };
};
