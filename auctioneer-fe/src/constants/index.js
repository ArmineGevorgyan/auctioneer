const constants = {
  token: "token",
  isAdmin: "isAdmin",
  validURLRegex: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
  placeholderImageUrl:
    "https://aatralcreations.com/wp-content/uploads/2020/05/placeholder-1-2.png",
  bidStatus: { LOST: "LOST", IN_PROGRESS: "IN_PROGRESS", WON: "WON" },
  productStatus: { CLOSED: "CLOSED", IN_PROGRESS: "IN_PROGRESS", SOLD: "SOLD" },
  broadcastChannels: { PRODUCT: "private-product" },
  broadcastEvents: { PRODUCT_UPDATED: "product.updated" },
};
export default constants;
