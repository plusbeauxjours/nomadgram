import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from 'react-facebook-login';
import formStyles from "shared/formStyles.scss";

const SignupForm = (
  {
    handleFacebookLogin,
    handleSubmit,
    handleInputChange,
    emailValue,
    usernameValue,
    nameValue,
    passwordValue
  },
  context
) => (
  <div className={formStyles.formComponent}>
    <h3 className={formStyles.signupHeader}>
      {context.t("Sign up to see photos and videos from your friends.")}
    </h3>
    <FacebookLogin
      appId="813108485540895"
      autoLoad={false}
      fields="name,email,picture"
      callback={handleFacebookLogin}
      cssClass={formStyles.button}
      icon="fa-facebook-official"
      textButton={context.t("Log in with Facebook")}
    />
    <span className={formStyles.divider}>{context.t("or")}</span>
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder={context.t("email")}
        className={formStyles.textInput}
        name="email"
        onChange={handleInputChange}
        value={emailValue}
      />
      <input
        type="text"
        placeholder={context.t("Full Name")}
        className={formStyles.textInput}
        name="name"
        onChange={handleInputChange}
        value={nameValue}
      />
      <input
        type="username"
        placeholder={context.t("Username")}
        className={formStyles.textInput}
        name="username"
        onChange={handleInputChange}
        value={usernameValue}
      />
      <input
        type="password"
        placeholder={context.t("Password")}
        className={formStyles.textInput}
        name="password"
        onChange={handleInputChange}
        value={passwordValue}
      />
      <input
        type="submit"
        placeholder={context.t("Sign up")}
        className={formStyles.button}
        onChange={handleInputChange}
      />
    </form>
    <p className={formStyles.terms}>
      {context.t("By signing up, you agree to our")}
      <span>{context.t("Terms & Privacy Policy.")}</span>
    </p>
  </div>
);

SignupForm.propTypes = {
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  emailValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SignupForm;