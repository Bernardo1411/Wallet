import React from 'react';
import PropTypes from 'prop-types';

import './Form.css';

function Form(props) {
  const {
    isEdit,
    editRow,
    submitExpensesHandler,
    moedas,
    valueRef,
    descriptionRef,
    currencyRef,
    paymentMethodRef,
    tagRef,
  } = props;

  return (
    <form
      onSubmit={ isEdit ? editRow : submitExpensesHandler }
      className={ isEdit ? 'wallet_form-edit' : 'wallet_form' }
    >
      <label htmlFor="value-input">
        Valor:
        <input
          type="number"
          id="value-input"
          data-testid="value-input"
          name="value-input"
          ref={ valueRef() }
          placeholder="0"
          min="0"
          required
          className="wallet_form-input wallet_form-input-valor"
        />
      </label>
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          id="description-input"
          data-testid="description-input"
          name="description"
          ref={ descriptionRef() }
          required
          className="wallet_form-input"
        />
      </label>
      <label htmlFor="currency-input">
        Moeda:
        <select
          name="currency"
          id="currency-input"
          data-testid="currency-input"
          defaultValue="USD"
          ref={ currencyRef() }
          className="wallet_form-input"
        >
          {moedas.map((moeda) => (
            <option key={ moeda } value={ moeda }>
              { moeda }
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          name="method"
          id="method-input"
          data-testid="method-input"
          defaultValue="Dinheiro"
          ref={ paymentMethodRef() }
          className="wallet_form-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag-input">
        Tag:
        <select
          name="tag"
          id="tag-input"
          data-testid="tag-input"
          defaultValue="Alimentação"
          ref={ tagRef() }
          className="wallet_form-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <button
        type="submit"
        className={
          isEdit
            ? 'wallet_form-edit-button'
            : 'wallet_form-add-button'
        }
      >
        { isEdit ? 'Editar despesa' : 'Adicionar despesa' }
      </button>
    </form>
  );
}

Form.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  editRow: PropTypes.func.isRequired,
  submitExpensesHandler: PropTypes.func.isRequired,
  moedas: PropTypes.arrayOf(PropTypes.string).isRequired,
  valueRef: PropTypes.func.isRequired,
  descriptionRef: PropTypes.func.isRequired,
  currencyRef: PropTypes.func.isRequired,
  paymentMethodRef: PropTypes.func.isRequired,
  tagRef: PropTypes.func.isRequired,
};

export default Form;
