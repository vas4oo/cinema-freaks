import * as React from "react";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faTablets,
  faPills,
  faSignOutAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import Growl from "../../common/components/growl/growl";
import * as Constants from "../../common/constants";
import { Tooltip } from "@material-ui/core";
import AuthService from "../../services/authService";
import * as actionTypes from "../../store/actionTypes";
import LoginComponent from "../login/loginComponent";

interface IProps {
  history: any;
  onUserLogout: any;
  isUserLogged: boolean;
}

interface IState {
  isAuthenticated: boolean;
  isLoginDialogOpen: boolean;
}

class HeaderComponent extends React.Component<IProps, IState> {
  growl: any;
  authService = new AuthService();

  constructor(props: IProps) {
    super(props);

    this.state = {
      isAuthenticated: this.authService.isAuthenticated(),
      isLoginDialogOpen: false
    };
  }

  componentDidMount() { }

  handleBackClick = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  handleLogin = () => {
    this.setState({ isLoginDialogOpen: true });
  };

  handleLogout = () => {
    this.authService.logout();
    this.props.onUserLogout();
    this.props.history.push("/");
    this.setState({
      isAuthenticated: this.authService.isAuthenticated()
    });
  };

  closeDialog = (showSuccess?: boolean) => {
    this.setState({ isLoginDialogOpen: false });
    if (showSuccess) {
      this.growl.show({
        severity: "success",
        summary: "Login complete"
      });
      this.props.history.push(`/`)
    }
  };

  handleRegister = () => {
    this.closeDialog();
    this.props.history.push(`/register`);
  }

  render() {
    const { isLoginDialogOpen } = this.state;

    const LogoutContent = React.forwardRef((props, ref) => (
      <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
    ));
    const LoginContent = React.forwardRef((props, ref) => (
      <FontAwesomeIcon icon={faUser} size="lg" />
    ));

    const backButton =
      window.location.pathname !== "/" ? (
        <div
          className="app-header-item back-button"
          onClick={e => this.handleBackClick(e)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      ) : null;

    return (
      <>
        <div
          style={{
            backgroundColor: "#2b415f",
            width: "100%",
            height: 54,
            position: "fixed",
            zIndex: 5
          }}
        >
          <Growl ref={el => (this.growl = el)} />
          <div className="app-header">
            <div className="app-header-left">
              {window.innerWidth < Constants.device.desktop ? (
                backButton
              ) : (
                  <>
                    {backButton}
                    <NavLink exact to="/">
                      <div className="app-navigation-item">
                        {window.innerWidth < Constants.device.desktop ? (
                          <FontAwesomeIcon
                            icon={faTablets}
                            size="2x"
                            style={{ margin: "5px" }}
                          />
                        ) : null}
                        Home
                    </div>
                    </NavLink>

                    <NavLink exact to="/movies">
                      <div className="app-navigation-item">
                        {window.innerWidth < Constants.device.desktop ? (
                          <FontAwesomeIcon
                            icon={faPills}
                            size="2x"
                            style={{ margin: "5px" }}
                          />
                        ) : null}
                        Movies
                    </div>
                    </NavLink>
                  </>
                )}
            </div>

            <div className="app-header-center">
              <Link to="/">MOVIE FREAKS</Link>
            </div>

            <div className="app-header-right">
              {this.authService.isAuthenticated() ? (
                <>
                  <div
                    className="app-header-item user-menu-web"
                    onClick={this.handleLogout}
                  >
                    <Tooltip title={"Logout"}>
                      <LogoutContent />
                    </Tooltip>
                  </div>
                </>
              ) : (
                  <div
                    className="app-header-item user-menu-web"
                    onClick={this.handleLogin}
                  >
                    <Tooltip title={"Login"}>
                      <LoginContent />
                    </Tooltip>
                  </div>
                )}
            </div>
          </div>
          <LoginComponent
            dialogOpen={isLoginDialogOpen}
            closeDialog={this.closeDialog}
            handleRegister={this.handleRegister}
          />
        </div>
      </>
    );
  }
}

const mapsStateToProps = state => {
  return {
    isUserLogged: state.common.isUserLogged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserLogout: () => dispatch({ type: actionTypes.USER_LOGOUT })
  };
};

export default withRouter(
  connect(mapsStateToProps, mapDispatchToProps)(HeaderComponent)
);
