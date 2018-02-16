import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from 'redux/modules/user';
// import { bindActionCreators } from 'redux';

const mapStateToProps = (state, ownProps) => {
    const { user: { userList } } = state;
    return {
        userList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getExplore: () => {
            dispatch(userActions.getExplore());
        }
    }
}

// USING bindActionCreators

// function mapDispatchToProps(dispatch, ownProps){
//   return {
//     getExplore: bindActionCreators(userActions.getExplore, dispatch)
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(Container);