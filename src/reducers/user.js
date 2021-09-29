const initialState = {
  email: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'AUTH_SUCCESS':
    return {
      ...state,
      ...{ email: action.email },
    };
  default:
    return state;
  }
};

export default authReducer;
