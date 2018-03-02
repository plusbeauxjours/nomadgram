import { connect } from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
    const { notifications: { notificationList } } = state;
    return { 
        notificationList
    };
};

export default connect(mapStateToProps)(Container);
