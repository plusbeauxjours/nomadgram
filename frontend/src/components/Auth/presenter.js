import React from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import LoginForm from 'components/LoginForm';
import SignupForm from 'components/SignupForm';

const Auth = (
  {
    action, 
    changeAction
  }, 
  context
) => (
  <main className={styles.auth}>
    <div className={styles.column}>
      <img src={require("images/phone.png" )} alt={context.t('Check our app. Is cool')} />
    </div>
    <div className={styles.column}>
    <div className={`${styles.whiteBox} ${styles.formBox}`}>
      {action === 'login' && <LoginForm />}
      {action === 'signup' && <SignupForm />}
    </div>
      <div className={styles.whiteBox}>
        {action === "login" && (
          <p className={styles.text}>
            {context.t("Don't have an account?")}{" "}
            <span className={styles.changeLink} onClick={changeAction}>
              {context.t('Sign up')}
            </span>
          </p>
        )}
        {action === "signup" && (
          <p className={styles.text}>
            {context.t('Have an account?')}{" "}
            <span className={styles.changeLink} onClick={changeAction}>
              {context.t('Log in')}
            </span>
          </p>
        )}
      </div>
      <div className={styles.appBox}>
        <span>{context.t('Get the app')}</span>
        <div className={styles.appstores}>
          <img
            src={require("images/ios.png")}
            alt={context.t('Download it on the Apple Appstore')}
          />
          <img
            src={require("images/android.png")}
            alt={context.t('Download it on tha Android Appstore')}
          />
        </div>
      </div>
    </div>
  </main>
);

Auth.propTypes = {
  action: PropTypes.string.isRequired,
  changeAction: PropTypes.func.isRequired,
};

Auth.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Auth;