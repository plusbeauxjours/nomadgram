import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import Ionicon from "react-ionicons";

const Notification = props => (
    <div className={styles.container}>
        <div className={styles.box}>
            <header className={styles.header}>
                <h4 className={styles.title}>{props.title}</h4>
                <span className={styles.icon} onClick={props.closeNotifications}>
                    <Ionicon icon='md-close' fontSize='20px' color='black' />
                </span>
            </header>
            <span className={styles.content}>
                {props.loading ? <Loading /> : <RenderNotification notification={props.notification} />}
            </span>
        </div>
    </div>
);

const RenderNotification = (props, context) => (
    <div className={styles.notification}>
        <h1 className={styles.username}>{props}</h1>
        <h1>hahah</h1>
    </div>
);

Notification.propTypes = {
    loading: PropTypes.bool.isRequired,
    notification: PropTypes.arrayOf({
        id: PropTypes.number.isRequiored
    })
};

export default Notification;