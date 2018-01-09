import React from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import formStyles from "shared/formStyles.scss";

const LoginForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder={context.t("Username")}
        className={formStyles.textInput} 
        name='username'
        value={props.usernameValue}
        onChange={props.handleInputChange}
      />
      <input
        type='password'
        placeholder={context.t("Password")}
        className={formStyles.textInput}
        name='password'
        value={props.passwordValue}
        onChange={props.handleInputChange}
      />
      <input
        type="submit"
        value={context.t("Log in")}
        className={formStyles.button}
      />
    </form>
    <span className={formStyles.diveder}>{context.t("or")}</span>
    <span className={formStyles.facebookLink}>
      <Ionicon icon="logo-facebook" fontSize="20px" color="#385185" />
      {context.t("Log in with Facebook")}
    </span>
    <span className={formStyles.forgotLink}>{context.t("Forgot password?")}</span>
  </div>
);

LoginForm.propTypes = {
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default LoginForm;