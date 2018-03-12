import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import Ionicon from 'react-ionicons';
import UserDisplay from 'components/UserDisplay';

const UserList = props => (
    <div className={styles.container}>
        <div className={styles.box}>
            <header className={styles.header}>
                <h4 className={styles.title}>{props.title}</h4>
                <span className={styles.icon} onClick={props.closeUsers}>
                    <Ionicon icon='md-close' fontSize='20px' color='black' />
                </span>
            </header>
            <div className={styles.content}>
                {props.loading ? <Loading /> : <RenderUsers list={props.userList} />}
            </div>
        </div>
    </div>
);

const RenderUsers = props => 
    props.list.map(user => 
        <UserDisplay 
            horizontal={true}
            user={user} 
            key={user.id} 
        />
    );

UserList.propTypes = {
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    userList: PropTypes.array,
    closeUsers: PropTypes.func.isRequired
}

RenderUsers.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            horizontal: PropTypes.bool.isRequired,
            user: PropTypes.array,
            id: PropTypes.number.isRequired
        })
    )
};

export default UserList;