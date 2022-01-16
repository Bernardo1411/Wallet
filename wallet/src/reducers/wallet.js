import { alocador, formatArray } from './helpers/helpers';

const initialState = {
  isFetching: false,
  currencyToExchange: 'BRL',
  currencies: [],
  expenses: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_CURRENCY':
    return {
      ...state,
      currencies: state.currencies.concat(action.currencies),
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: formatArray(state.expenses
        .concat({
          ...action.expense,
          id: alocador(state.expenses, state.expenses.length),
        })),
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.expenseData.id) {
          return {
            ...expense,
            ...action.expenseData,
          };
        }

        return expense;
      }),
    };
  case 'IS_FETCHING':
    return {
      ...state,
      isFetching: action.isFetching,
    };
  default:
    return state;
  }
};

export default walletReducer;
