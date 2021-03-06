import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
  componentDidMount() {
    if (this.props.security.validToken) {
      //don't login again
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Personal Kanban Tool</h1>
                <p className="lead">
                  Create your account to join active projects or start you own
                </p>
                <hr />
                <Link className="btn btn-lg btn-primary mr-2" to="/register">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-secondary mr-2">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    security: state.security
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     login: loginRequest => dispatch(login(loginRequest))
//   };
// };

export default connect(
  mapStateToProps,
  null
)(Landing);
