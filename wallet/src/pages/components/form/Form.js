import React from "react";
import PropTypes from "prop-types";

import "./Form.css";

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
      onSubmit={isEdit ? editRow : submitExpensesHandler}
      className={isEdit ? "wallet_form-edit" : "wallet_form"}
    >
      <div className="wallet_form_content">
        <label htmlFor="value-input">
          Value:
          <input
            type="number"
            id="value-input"
            name="value-input"
            ref={valueRef()}
            placeholder="0"
            min="0"
            required
            className="wallet_form-input wallet_form-input-valor"
          />
        </label>
        <label htmlFor="description-input">
          Description:
          <input
            type="text"
            id="description-input"
            name="description"
            ref={descriptionRef()}
            required
            className="wallet_form-input"
          />
        </label>
        <label htmlFor="currency-input">
          Currency:
          <select
            name="currency"
            id="currency-input"
            defaultValue="USD"
            ref={currencyRef()}
            className="wallet_form-input"
          >
            {moedas.map((moeda) => (
              <option key={moeda} value={moeda}>
                {moeda}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Payment Method:
          <select
            name="method"
            id="method-input"
            defaultValue="Cash"
            ref={paymentMethodRef()}
            className="wallet_form-input"
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select
            name="tag"
            id="tag-input"
            defaultValue="Food"
            ref={tagRef()}
            className="wallet_form-input"
          >
            <option value="Food">Food</option>
            <option value="Leisure">Leisure</option>
            <option value="Work">Work</option>
            <option value="Transport">Transport</option>
            <option value="Health">Health</option>
          </select>
        </label>
      </div>
      <div className="wallet_form_button">
        <button
          type="submit"
          className={
            isEdit ? "wallet_form-edit-button" : "wallet_form-add-button"
          }
        >
          {isEdit ? "Edit" : "Add"}
        </button>
      </div>
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
