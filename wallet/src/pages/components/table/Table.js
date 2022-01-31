import React from "react";
import PropTypes from "prop-types";

import "./Table.css";

function Table(props) {
  const { despesas, isEdit, deleteRow } = props;

  return (
    <table className="wallet_table">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Tag</th>
          <th scope="col">Method</th>
          <th scope="col">Value</th>
          <th scope="col">Exchange</th>
          <th scope="col">Value (BRL)</th>
          <th scope="col"><p>Edit/</p><p>Delete</p></th>
        </tr>
      </thead>
      <tbody>
        {despesas.map((despesa) => (
          <tr key={despesa.id}>
            <td>{despesa.description}</td>
            <td>{despesa.tag}</td>
            <td>{despesa.method}</td>
            <td>{despesa.value}</td>
            <td>
              {`${Number(
                despesa.exchangeRates[`${despesa.currency}`].ask
              ).toFixed(2)} ${despesa.currency}|BRL`}
            </td>
            <td>
              {`${(
                despesa.value *
                Number(despesa.exchangeRates[`${despesa.currency}`].ask)
              ).toFixed(2)}`}
            </td>
            <td>
              <button
                type="button"
                onClick={() => {
                  isEdit(despesa.id);
                }}
                className="wallet_table-edite"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteRow(despesa.id);
                }}
                className="wallet_table-delete"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEdit: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
};

export default React.memo(Table);
