import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import styles from './styles.scss';

const CommentBox = (
  { 
    handleSubmit, 
    comment, 
    handleInputChange, 
    handleKeyPress 
  }, 
  context
) => (
  <form className={styles.commentBox} onSubmit={handleSubmit}>
    <Textarea
      className={styles.input}
      placeholder={context.t("Add a comment...")}
      value={comment}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
    />
  </form>
);

CommentBox.propTypes = {
  handleSubmit: PropTypes.func,
  comment: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired
};

CommentBox.contextTypes = {
  t: PropTypes.func.isRequired
}

export default CommentBox;