import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";

import { auth } from "../actions";

import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
      redirect: false,
    };

    this.submitCredentialsHandler = this.submitCredentialsHandler.bind(this);
  }

  setEmail(event) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  setPassword(event) {
    event.preventDefault();
    this.setState({ senha: event.target.value });
  }

  credentialValidationHandler() {
    let checkIsValid = false;

    const { email, senha } = this.state;

    const pattern = {
      email: /^([a-z\d-]+)@([a-z\d-]+)\.([a-z]{2,8})$/,
      senha: /^(.{6,})$/,
    };

    checkIsValid = !!(pattern.email.test(email) && pattern.senha.test(senha));

    return checkIsValid;
  }

  submitCredentialsHandler(event) {
    event.preventDefault();

    const { email } = this.state;
    const { auth: authHandler } = this.props;

    authHandler(email);
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;

    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div className="form_page_login">
        <h2 className="form_page_title right">Wallet</h2>
        <div className="form_page_left">
          <div className="div_important">
            <h1>
              Expanses
            </h1>
            <h2>&</h2>
            <h1>
              Exchange
            </h1>
              <h3>All in one place</h3>
          </div>
        </div>
        <div className="form_page_right">
          <form onSubmit={this.submitCredentialsHandler} className="login_form">
            <h2>Let's start!</h2>
            <div className="login_form_section">
              <label className="label_login" htmlFor="email">
                E-mail
              </label>
              <input
                className="input_login"
                type="email"
                id="email"
                onChange={(event) => {
                  this.setEmail(event);
                }}
                required
              />
            </div>
            <div className="login_form_section">
              <label className="label_login" htmlFor="email">
                Password
              </label>
              <input
                className="input_login"
                type="password"
                id="password"
                minLength="6"
                onChange={(event) => {
                  this.setPassword(event);
                }}
                required
              />
            </div>
            <button
              disabled={!this.credentialValidationHandler()}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  auth: (email) => dispatch(auth(email)),
});

export default connect(null, mapDispatchToProps)(Login);
