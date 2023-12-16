import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Header from "./components/header/Header";
import Form from "./components/form/Form";
import Table from "./components/table/Table";
import Charts from "./components/charts/Charts";
import Spinner from "./components/UI/spinner/Spinner";

import {
  fetchCurrencyData,
  addExpense,
  deleteExpense,
  editExpense,
} from "../actions/index";

import "./Wallet.css";

class Wallet extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      id: "",
    };

    this.valueRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.currencyRef = React.createRef();
    this.paymentMethodRef = React.createRef();
    this.tagRef = React.createRef();

    this.editRow = this.editRow.bind(this);
    this.submitExpensesHandler = this.submitExpensesHandler.bind(this);
    this.isEdit = this.isEdit.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencyData: fetchCurrencyDataHandler } = this.props;
    fetchCurrencyDataHandler();
  }

  deleteRow(id) {
    this.setState({
      isEdit: false,
    });

    const { deleteExpense: deleteExpenseHandler } = this.props;
    deleteExpenseHandler(id);
  }

  isEdit(id) {
    if (
      id === this.state.id ||
      this.state.id === "" ||
      (id !== this.state.id && !this.state.isEdit)
    )
      this.setState((prevState) => {
        return {
          isEdit: !prevState.isEdit,
          id,
        };
      });
  }

  editRow(event) {
    event.preventDefault();

    const { id } = this.state;

    const expenseData = {
      value: this.valueRef.current.value,
      description: this.descriptionRef.current.value,
      currency: this.currencyRef.current.value,
      method: this.paymentMethodRef.current.value,
      tag: this.tagRef.current.value,
      id,
    };

    this.setState({
      isEdit: false,
    });

    const { editExpense: editExpenseHandler } = this.props;
    editExpenseHandler(expenseData);

    this.valueRef.current.value = "";
    this.descriptionRef.current.value = "";
  }

  submitExpensesHandler(event) {
    event.preventDefault();

    const expenseData = {
      value: this.valueRef.current.value,
      description: this.descriptionRef.current.value,
      currency: this.currencyRef.current.value,
      method: this.paymentMethodRef.current.value,
      tag: this.tagRef.current.value,
    };

    const { addExpense: addExpenseHandler } = this.props;
    addExpenseHandler(expenseData);

    this.valueRef.current.value = "";
    this.descriptionRef.current.value = "";
  }

  exit() {
    window.location.href = '/';
    window.sessionStorage.removeItem('isAuth');
  }

  render() {
    const {
      email,
      despesas,
      moedas,
      isFetching,
      currencyToExchange,
      totalExpenses,
      totalExpensesArray,
    } = this.props;

    const { isEdit } = this.state;

    return (
      <div className="wallet_page">
        {isFetching ? <Spinner /> : ""}
        <h2 className="dashboard_title right">Wallet</h2>
        <button className="exit" type="button" onClick={this.exit}>Exit</button>
        <Header
          email={email}
          currencyToExchange={currencyToExchange}
          totalExpenses={() => totalExpenses}
        />
        <Charts
          expenses={this.props.despesas}
          totalExpenses={totalExpensesArray}
        />
        <Form
          isEdit={isEdit}
          editRow={this.editRow}
          submitExpensesHandler={this.submitExpensesHandler}
          moedas={moedas}
          valueRef={() => this.valueRef}
          descriptionRef={() => this.descriptionRef}
          currencyRef={() => this.currencyRef}
          paymentMethodRef={() => this.paymentMethodRef}
          tagRef={() => this.tagRef}
        />
        <Table
          despesas={despesas}
          isEdit={this.isEdit}
          deleteRow={this.deleteRow}
        />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalExpenses: PropTypes.string.isRequired,
  totalExpensesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  moedas: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFetching: PropTypes.bool.isRequired,
  currencyToExchange: PropTypes.string.isRequired,
  fetchCurrencyData: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesas: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpenses,
  totalExpensesArray: state.wallet.totalExpensesArray,
  moedas: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  currencyToExchange: state.wallet.currencyToExchange,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyData: () => dispatch(fetchCurrencyData()),
  addExpense: (expenseData) => dispatch(addExpense(expenseData)),
  deleteExpense: (id) => dispatch(deleteExpense(id)),
  editExpense: (expenseData) => dispatch(editExpense(expenseData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
