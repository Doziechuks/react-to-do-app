import { userType } from "./userType";

const initialState = {
  currentUser: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userType.setCurrentUser:
      return {
        ...state,
        currentUser: action.payload
      }
      default:
        return state
  }
}

export default userReducer;