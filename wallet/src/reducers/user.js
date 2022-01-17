const initialState = {
  email: "",
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        ...{
          email: action.email,
          isAuth: action.isAuth,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
