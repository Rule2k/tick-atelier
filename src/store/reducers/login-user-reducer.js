const initialState = {
  username: '',
};

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_HOME = 'LOGIN_USER_HOME';


const loginReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const checkUserLoggedIn = alias => ({
  type: LOGIN_USER,
  alias,
});

export const checkUserLoggedInHome = () => ({
  type: LOGIN_USER_HOME,
});


export default loginReducer;
