import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import UserDisplay from "components/UserDisplay";
import PhotoDisplay from 'components/PhotoDisplay';

const Search = (
    {
        loading,
        userList,
        imageList,
    }, 
    context
) => {
    return (
        <div className={styles.search}>
            <div className={styles.section}>
                <h4 className={styles.title}>{context.t('Users')}</h4>
                    {loading && <Loading />}
                    {!loading && 
                        userList.length < 1 && (
                            <NotFound text={context.t('Nothing found :(')} />
                    )}
                <div className={styles.content}>
                    {!loading && 
                        userList.length > 0 && (
                            <RenderUserSearch userList={userList} />
                    )}
                </div>
            </div>
            <div className={styles.section}>
                <h4 className={styles.title}>{context.t('Photos')}</h4>
                    {loading && <Loading />}
                    {!loading && 
                        imageList.length < 1 && (
                            <NotFound text={context.t('Nothing found :(')} />
                    )}
                <div className={styles.content}>
                        {!loading &&
                            imageList.length > 0 && (
                            <RenderImageSearch imageList={imageList} />
                        )}
                </div>
            </div>
        </div>
    );
};

const RenderUserSearch = props => (
    <div className={styles.container}>
        {props.userList.map(user => (
            <UserDisplay vertical={true} user={user} key={user.id} />
        ))}
    </div>
);

const RenderImageSearch = props => (
  <div className={styles.container}>
    {props.imageList.map(photo => (
        <PhotoDisplay photo={photo} key={photo.id} />
        ))}
  </div>
);

const NotFound = props => <span className={styles.notFound}>{props.text}</span>

Search.contextTypes = {
    t: PropTypes.func.isRequired
}

Search.propTypes = {
    loading: PropTypes.bool.isRequired,
    imageList: PropTypes.array,
    userList: PropTypes.array
}

RenderUserSearch.propTypes = {
  userList: PropTypes.array
};

NotFound.PropTypes = {
    text: PropTypes.string.isRequired
}

export default Search;