/**
 * We use 'Ducks' proposal for combining reducers,
 * actions, action creators and epics in one file
 *
 * For more information:
 * https://github.com/erikras/ducks-modular-redux
 */
import { combineReducers } from "redux";
import authSlice from "./auth";

const appReducer = combineReducers({
  auth: authSlice,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
