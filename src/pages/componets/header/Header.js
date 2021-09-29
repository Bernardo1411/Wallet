import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

function Header(props) {
  const { email, currencyToExchange, totalExpenses } = props;

  return (
    <header className="wallet_header">
      <h2 data-testid="email-field" className="email_header">
        {email}
      </h2>
      <h2 data-testid="total-field">
        Despesa total:
        {' '}
        { totalExpenses() }
      </h2>
      <h2 data-testid="header-currency-field">{currencyToExchange}</h2>
    </header>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  currencyToExchange: PropTypes.string.isRequired,
  totalExpenses: PropTypes.func.isRequired,
};

export default Header;
