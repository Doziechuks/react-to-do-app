import { userType } from "./userType";

export const userAction = (user) => ({
  type: userType.setCurrentUser,
  payload: user
})