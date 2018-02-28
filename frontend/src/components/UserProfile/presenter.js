import React from "react";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import styles from "./styles.scss";



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
        <div className={styles.naming}>
          {props.userProfile.username}
          {props.userProfile.is_self}
          {props.userProfile.following}
        </div>
        <ul className={styles.countingfolder}>
          <li className={styles.counting}>
            {props.userProfile.post_count}{' '}
            {context.t("posts")}
          </li>
          <li className={styles.counting}>
            {props.userProfile.followers_count}{' '}
            {context.t("followers")}
          </li>
          <li className={styles.counting}>
            {props.userProfile.following_count}{' '}
            {context.t("following")}
          </li>
        </ul>
        <div className={styles.text}>
          <h1>{props.userProfile.name}</h1>
          <h1>{props.userProfile.bio}</h1>
          <h1>{props.userProfile.website}</h1>
        </div>
      </div>
    </div>
    <div className={styles.images}>
      {props.userProfile.images.map(image => (
        <RenderUserImage image={image} key={image.id} />
      ))}
    </div>
  </div>
);

const RenderUserImage = props => (
  <div className={styles.imagefolder}>
    <img
      src={props.image.file}
      alt={props.image.id}
      className={styles.image}
    />
    <ul className={styles.imagecount}>
      <li>{props.image.like_count}</li>
      <li>{props.image.comment_count}</li>
    </ul>
  </div>
);


RenderUserProfile.contextTypes = {
  t: PropTypes.func.isRequired
};

UserProfile.propTypes = {
}

export default UserProfile;
