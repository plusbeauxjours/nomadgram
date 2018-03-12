import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from 'react-facebook-login';
import formStyles from "shared/formStyles.scss";

const LoginForm = (
  {
    handleSubmit,
    usernameValue,
    handleInputChange,
    passwordValue,
    handleFacebookLogin,
  }, 
  context
) => (
  <div className={formStyles.formComponent}>
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={context.t("Username")}
        className={formStyles.textInput}
        name="username"
        value={usernameValue}
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder={context.t("Password")}
        className={formStyles.textInput}
        name="password"
        value={passwordValue}
        onChange={handleInputChange}
      />
      <input
        type="submit"
        value={context.t("Log in")}
        className={formStyles.button}
      />
    </form>
    <span className={formStyles.divider}>{context.t("or")}</span>
    <FacebookLogin
      appId="813108485540895"
      autoLoad={false}
      fields="name,email,picture"
      callback={handleFacebookLogin}
      cssClass={formStyles.facebookLink}
      icon='fa-facebook-official'
      textButton={context.t('Log in with Facebook')}
    />
    <span className={formStyles.forgotLink}>
      {context.t("Forgot password?")}
    </span>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  usernameValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default LoginForm;