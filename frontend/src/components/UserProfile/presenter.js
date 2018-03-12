import React from "react";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import styles from "./styles.scss";
import UserList from "components/UserList";
import PhotoDisplay from "components/PhotoDisplay";


const UserProfile = props => {
  if(props.loading){
    return <LoadingUserProfile />;
  } else if(props.userProfile){
    return <RenderUserProfile {...props} />
  }
}
    
const LoadingUserProfile = props => (
  <div className={styles.loading}>
    <Loading />
  </div>
);

const RenderUserProfile = (props, context) => (
  <div>
    <div className={styles.profile}>
      <img
        src={props.userProfile.profile_image || require("images/noPhoto.jpg")}
        alt={props.userProfile.username}
        className={styles.avatar}
      />
      <div className={styles.card}>
        <div className={styles.username}>
          {props.userProfile.username}
          {props.userProfile.is_self}
          {props.userProfile.is_following}
        </div>
        <ul className={styles.countingfolder}>
          <li className={styles.counting}>
            <span className={styles.number}>
              {props.userProfile.post_count}{" "}
            </span>
            <span>{context.t("posts")}</span>
          </li>
          <li className={styles.open} onClick={props.openUserFollowers}>
            <span className={styles.number}>
              {props.userProfile.followers_count}{" "}
            </span>
            <span>{context.t("followers")}</span>
          </li>
          <li className={styles.open} onClick={props.openUserFollowing}>
            <span className={styles.number}>
              {props.userProfile.following_count}{" "}
            </span>
            <span>{context.t("following")}</span>
          </li>
        </ul>
        <div className={styles.text}>
          <p className={styles.name}>{props.userProfile.name}</p>
          <p className={styles.website}>{props.userProfile.website}</p>
          <p className={styles.bio}>{props.userProfile.bio}</p>
        </div>
      </div>
    </div>
    <div className={styles.images}>
      {props.userProfile.images.map(image => (
        <PhotoDisplay photo={image} key={image.id} />
      ))}
    </div>
    {props.seeingUsers && (
      <UserList
        title={context.t("Users")}
        closeUsers={props.closeUsers}
        userList={props.userList}
      />
    )}
  </div>
);


RenderUserProfile.contextTypes = {
  t: PropTypes.func.isRequired
};

UserProfile.propTypes = {
  loading: PropTypes.bool,
};

RenderUserProfile.propTypes = {
  userProfile: PropTypes.shape({
      id: PropTypes.number.isRequired,
      profile_image: PropTypes.string,
      username: PropTypes.string.isRequired,
      is_self: PropTypes.bool.isRequired,
      is_following: PropTypes.bool.isRequired,
      post_count: PropTypes.number.isRequired,
      followers_count: PropTypes.number.isRequired,
      following_count: PropTypes.number.isRequired,
      name: PropTypes.string,
      website: PropTypes.string,
      bio: PropTypes.string
    }).isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.array
    })
  ),
  seeingUsers: PropTypes.bool.isRequired,
  closeUsers: PropTypes.func.isRequired,
  userList: PropTypes.array
};

export default UserProfile;
