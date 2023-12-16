const isFetching = () => ({
  type: 'IS_FETCHING',
  isFetching: true,
});

const isFetched = () => ({
  type: 'IS_FETCHING',
  isFetching: false,
});

const dataFetching = async (dispatch) => {
  dispatch(isFetching());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

    dispatch(isFetched());

    return data;
  } catch (error) {
    dispatch(isFetched());
    return error;
  }
};

export const auth = (email) => (dispatch) => {
  window.sessionStorage.setItem('isAuth', true);
  dispatch({
    type: 'AUTH_SUCCESS',
    email,
    isAuth: true,
  });
};

export const fetchCurrencyData = () => async (dispatch) => {
  const data = await dataFetching(dispatch);

  const currencies = Object.entries(data)
    .filter((currency) => (currency[0] !== 'USDT' && currency[0] !== 'DOGE'))
    .map((currency) => currency[1].code);

  dispatch({ type: 'FETCH_CURRENCY', currencies });
};

export const addExpense = (expenseData) => async (dispatch) => {
  const data = await dataFetching(dispatch);

  const exchangeRates = {};

  Object.entries(data)
    .filter((currency) => (currency[0] !== 'DOGE'))
    .forEach((currency) => {
      Object.assign(exchangeRates, {
        [`${currency[0]}`]: {
          ...currency[1],
          name: currency[1].name.split('/')[0],
        },
      });
    });

  const expense = { ...expenseData, exchangeRates };

  dispatch({ type: 'ADD_EXPENSE', expense });
};

export const deleteExpense = (id) => (dispatch) => {
  dispatch({ type: 'DELETE_EXPENSE', id });
};

export const editExpense = (expenseData) => (dispatch) => {
  dispatch({ type: 'EDIT_EXPENSE', expenseData });
};
