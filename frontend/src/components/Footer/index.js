import React from 'react';
import styles from './styles.scss';

const Footer = (props, context) => (
  <footer className={styles.footer}>
    <div className={styles.column}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>about us</li>
          <li className={styles.listItem}>support</li>
          <li className={styles.listItem}>blog</li>
          <li className={styles.listItem}>press</li>
          <li className={styles.listItem}>API</li>
          <li className={styles.listItem}>jobs</li>
          <li className={styles.listItem}>privacy</li>
          <li className={styles.listItem}>terms</li>
          <li className={styles.listItem}>directory</li>
          <li className={styles.listItem}>language</li>
        </ul>
      </nav>
    </div>
    <div className={styles.column}>
      <span className={styles.copyright}>2018 nomadgram</span>
    </div>
  </footer>
);

export default Footer;


