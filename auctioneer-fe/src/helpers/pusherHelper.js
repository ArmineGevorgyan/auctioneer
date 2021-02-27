import Pusher from "pusher-js";
import { getToken } from "./auth";
import constants from "../constants";
import { API_URL, PUSHER_APP_KEY, PUSHER_CLUSTER } from "../config";
import store from "../redux/store";
import { productLiveUpdate } from "../redux/ducks/product";

const pusher = new Pusher(PUSHER_APP_KEY, {
  cluster: PUSHER_CLUSTER,
  forceTLS: true,
  authEndpoint: `${API_URL}/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  },
});

export const substribeProductCallback = (productId) => {
  let channel = pusher.subscribe(
    `${constants.broadcastChannels.PRODUCT}.${productId}`
  );
  channel.bind(constants.broadcastEvents.PRODUCT_UPDATED, (data) => {
    store.dispatch(productLiveUpdate(data));
  });
};

export const unsubstribeProductCallback = (productId) =>
  pusher.unsubscribe(`${constants.broadcastChannels.PRODUCT}.${productId}`);
