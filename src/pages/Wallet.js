import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './componets/header/Header';
import Form from './componets/form/Form';
import Table from './componets/table/Table';
import Spinner from './componets/UI/spinner/Spinner';

import {
  fetchCurrencyData,
  addExpense,
  deleteExpense,
  editExpense,
} from '../actions/index';

import './Wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      id: '',
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

  showExpenses(despesas, currency = 'BRL') {
    const despesaTotal = despesas.reduce((total, despesa) => (
      total
      + Number(despesa.value)
      * Number(despesa.exchangeRates[`${despesa.currency}`].ask)
    ), 0);

    return despesaTotal.toLocaleString('en-us', {
      style: 'currency',
      currency,
    });
  }

  deleteRow(id) {
    this.setState({
      isEdit: false,
    });

    const { deleteExpense: deleteExpenseHandler } = this.props;
    deleteExpenseHandler(id);
  }

  isEdit(id) {
    this.setState({
      isEdit: true,
      id,
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

    this.valueRef.current.value = '';
    this.descriptionRef.current.value = '';
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

    this.valueRef.current.value = '';
    this.descriptionRef.current.value = '';
  }

  render() {
    const { email, despesas, moedas, isFetching, currencyToExchange } = this.props;

    const { isEdit } = this.state;

    return (
      <div className="wallet_page">
        {isFetching ? (
          <Spinner />
        ) : ''}
        <Header
          email={ email }
          currencyToExchange={ currencyToExchange }
          totalExpenses={ () => this.showExpenses(despesas) }
        />
        <Form
          isEdit={ isEdit }
          editRow={ this.editRow }
          submitExpensesHandler={ this.submitExpensesHandler }
          moedas={ moedas }
          valueRef={ () => this.valueRef }
          descriptionRef={ () => this.descriptionRef }
          currencyRef={ () => this.currencyRef }
          paymentMethodRef={ () => this.paymentMethodRef }
          tagRef={ () => this.tagRef }
        />
        <Table
          despesas={ despesas }
          isEdit={ this.isEdit }
          deleteRow={ this.deleteRow }
        />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.object).isRequired,
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
