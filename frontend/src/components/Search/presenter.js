import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import UserRow from 'components/UserRow';

const Explore = props => {
    if (props.loading) {
        return <LoadingExplore />;
    }
};

const LoadingExplore = props => (
    <div className={styles.search}>
        <Loading />
    </div>
);

Explore.propTypes ={
    loading: PropTypes.bool.isRequired,
}

export default Explore;