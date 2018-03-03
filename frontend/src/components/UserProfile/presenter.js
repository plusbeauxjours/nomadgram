import React from "react";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";
import UserList from "components/UserList";

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
          <button className={styles.button} onClick={props.handleClick}>
            {props.userProfile.is_following
              ? context.t("Unfollow")
              : context.t("Follow")}
          </button>
          {console.log('presenterButton: ', props)}
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
        <RenderUserImage image={image} key={image.id} />
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

const RenderUserImage = props => (
  <div className={styles.imagefolder}>
    <img src={props.image.file} alt={props.image.id} className={styles.image} />
    <ul className={styles.imagecount}>
      <li>
        <Ionicon icon="ios-heart" fontSize="28px" color="white" />{" "}
        {props.image.like_count}
      </li>
      <li>
        <Ionicon icon="ios-text" fontSize="28px" color="white" />{" "}
        {props.image.comment_count}
      </li>
    </ul>
  </div>
);


RenderUserProfile.contextTypes = {
  t: PropTypes.func.isRequired
};

UserProfile.propTypes = {
}

export default UserProfile;
