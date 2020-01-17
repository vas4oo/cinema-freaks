import * as React from "react";
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronLeft, faSearch, faTablets, faPills, faSignOutAlt, faUser, } from '@fortawesome/free-solid-svg-icons';
import * as Constants from '../../common/constants';
import { Tooltip } from '@material-ui/core';
import AuthService from '../../services/authService';
import * as actionTypes from '../../store/actionTypes';

interface IProps {
    history: any,
    onUserLogout: any,
    isUserJustLogged: boolean,
    setUserJustLoggedToFalse: any,
    isUserLogged: boolean,
}

interface IState {
    isAuthenticated: boolean,
}

class HeaderComponent extends React.Component<IProps, IState> {
    growl: any;
    authService = new AuthService();

    constructor(props: IProps) {
        super(props);

        this.state = {
            isAuthenticated: this.authService.isAuthenticated(),
        }
    }

    componentDidMount() {

    }

    handleBackClick = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    handleLogin = () => {
        this.props.history.push('/login');
    }

    handleLogout = () => {
        this.authService.logout();
        this.props.onUserLogout();
        this.props.history.push('/');
        this.setState({
            isAuthenticated: this.authService.isAuthenticated()
        })
    }

    render() {
        const SearchContent = React.forwardRef((props, ref) => <FontAwesomeIcon size={window.innerWidth < Constants.device.desktop ? '1x' : 'lg'} icon={faSearch} />);

        const LogoutContent = React.forwardRef((props, ref) => <FontAwesomeIcon icon={faSignOutAlt} size="lg" />);
        const LoginContent = React.forwardRef((props, ref) => <FontAwesomeIcon icon={faUser} size="lg" />);

        const backButton = window.location.pathname !== '/' ?
            <div className="app-header-item back-button" onClick={(e) => this.handleBackClick(e)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            : null;

        return (
            <>
                <div style={{ backgroundColor: '#2b415f', width: '100%', height: 54, position: 'fixed', zIndex: 5 }}>
                    <div className="app-header">

                        <div className="app-header-left">
                            {window.innerWidth < Constants.device.desktop ? backButton :
                                <>
                                    {backButton}
                                    <NavLink to="/">
                                        <div className="app-navigation-item">
                                            {window.innerWidth < Constants.device.desktop ?
                                                <FontAwesomeIcon icon={faTablets} size="2x" style={{ margin: '5px' }} /> : null}
                                            Home
                                        </div>
                                    </NavLink>

                                    <NavLink to="/movies">
                                        <div className="app-navigation-item">
                                            {window.innerWidth < Constants.device.desktop ?
                                                <FontAwesomeIcon icon={faPills} size="2x" style={{ margin: '5px' }} /> : null}
                                            Movies
                    </div>
                                    </NavLink>
                                </>}
                        </div>

                        <div className="app-header-center">
                            <Link to="/">Movie freaks</Link>
                        </div>

                        <div className="app-header-right">

                            <div className="app-header-item" style={{ /* background: '#2196f3' */ }}>
                                <Tooltip title={"Search"}>
                                    <SearchContent />
                                </Tooltip>
                            </div>

                            {this.authService.isAuthenticated() ?
                                <>
                                    <div className="app-header-item user-menu-web" onClick={this.handleLogout} >
                                        <Tooltip title={"Logout"}>
                                            <LogoutContent />
                                        </Tooltip>
                                    </div>
                                </>
                                :
                                <div className="app-header-item user-menu-web" onClick={this.handleLogin}>
                                    <Tooltip title={"Login"}>
                                        <LoginContent />
                                    </Tooltip>
                                </div>}

                            <div className="app-header-item user-menu" style={{ /* background: '#2196f3' */ }} >
                                <FontAwesomeIcon icon={faBars} />
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

const mapsStateToProps = state => {
    return {
        isUserLogged: state.common.isUserLogged,
        isUserJustLogged: state.common.isUserJustLogged,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogout: () => dispatch({ type: actionTypes.USER_LOGOUT }),
        setUserJustLoggedToFalse: () => dispatch({ type: actionTypes.SET_USER_JUST_LOGGED_TO_FALSE }),
    }
}

export default withRouter(connect(mapsStateToProps, mapDispatchToProps)(HeaderComponent));