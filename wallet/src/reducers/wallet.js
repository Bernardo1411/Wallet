import { alocador, formatArray, showExpenses } from "../helpers/helpers";

const initialState = {
  isFetching: false,
  currencyToExchange: "BRL",
  currencies: [],
  expenses: [],
  totalExpenses: '0',
  totalExpensesArray: [{despesaTotal: 0, date: `${new Date().getMonth()+1}/${new Date().getDate()} - ${new Date().getHours()}:${new Date().getMinutes()}`}],
};

const walletReducer = (state = initialState, action) => {
  if (action.type === "FETCH_CURRENCY") {
    return {
      ...state,
      currencies: state.currencies.concat(action.currencies),
    };
  } else if (action.type === "ADD_EXPENSE") {
    const expenses = formatArray(
      state.expenses.concat({
        ...action.expense,
        id: alocador(state.expenses, state.expenses.length),
      })
    );
    const totalExpenses = showExpenses(expenses);
    const totalExpensesArray = [...state.totalExpensesArray, showExpenses(expenses, true)];
    return {
      ...state,
      expenses: expenses,
      totalExpenses,
      totalExpensesArray,
    };
  } else if (action.type === "DELETE_EXPENSE") {
    const expenses = state.expenses.filter(
      (expense) => expense.id !== action.id
    );
    const totalExpenses = showExpenses(expenses);
    const totalExpensesArray = [...state.totalExpensesArray, showExpenses(expenses, true)];
    return {
      ...state,
      expenses,
      totalExpenses,
      totalExpensesArray,
    };
  } else if (action.type === "EDIT_EXPENSE") {
    const expenses = state.expenses.map((expense) => {
      if (expense.id === action.expenseData.id) {
        return {
          ...expense,
          ...action.expenseData,
        };
      }

      return expense;
    });
    const totalExpenses = showExpenses(expenses);
    const totalExpensesArray = [...state.totalExpensesArray, showExpenses(expenses, true)];
    return {
      ...state,
      expenses,
      totalExpenses,
      totalExpensesArray,
    };
  } else if (action.type === "IS_FETCHING") {
    return {
      ...state,
      isFetching: action.isFetching,
    };
  } else return state;
};

export default walletReducer;
