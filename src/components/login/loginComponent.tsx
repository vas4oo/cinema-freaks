import * as React from "react";
import Spinner from '../../common/components/spinner/spinner';
import { UserModel } from '../../models/userModel';
import AuthService from "../../services/authService";
import Growl from '../../common/components/growl/growl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface IProps {
    history: any,
}

interface IState {
    isLoading: boolean;
    user: UserModel;
    isLogged: boolean;
}

class LoginComponent extends React.Component<IProps, IState> {

    authService = new AuthService();
    growl: any;

    constructor(props: IProps) {
        super(props);

        this.state = {
            isLoading: false,
            user: new UserModel(),
            isLogged: false,
        };
    }

    componentDidMount() {
    }

    handleChange = (key, value) => {
        const user: UserModel = { ...this.state.user };
        user[key] = value;
        this.setState({ user: { ...user } });
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleLoginButton(e);
        }
    }

    isValidAddEditForm() {
        let message = '';

        if (!this.state.user.username || this.state.user.username.trim() === '') {
            message += 'Please enter username' + '. ';
        }

        if (!this.state.user.password || this.state.user.password.trim() === '') {
            message += 'Please enter Password' + '. ';
        }

        if (message !== '') {
            this.growl.show({ severity: 'error', summary: message });
        }

        return message === '';
    }

    handleLoginButton = event => {
        event.preventDefault();

        if (!this.isValidAddEditForm()) return;

        this.setState({
            isLoading: true
        });

        const user = this.state.user;

        this.authService.login(user).then(
            (data: any) => {
                if (data) {
                    this.setState({
                        isLoading: false,
                        isLogged: data
                    });
                    this.redirectAfterLogin();
                }
            })
            .catch(error => {
                this.growl.show({ severity: 'error', summary: error.message });
                this.setState({
                    isLoading: false
                });
            });
    }

    redirectAfterLogin() {
        //this.props.onUserLogin();    
        this.props.history.push(`/`);
    }

    public render() {
        const { isLoading, user } = this.state;

        return (
            <div className="app-content">
                {isLoading ? <Spinner /> : null}
                <Growl ref={(el) => this.growl = el} />

                <h2>Login</h2>

                <div>
                    <div className="p-g p-fluid">
                        <div className="p-g-12 p-md-6">
                            <TextField
                                name="username"
                                label="Username"
                                type="username"
                                value={user && user.username ? user.username : ""}
                                onChange={(e) => this.handleChange('username', e.target['value'])}
                            />
                        </div>
                        <div className="p-g-12 p-md-6">
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
                                onKeyPress={this.handleKeyPress}
                                onChange={(e) => this.handleChange('password', e.target['value'])}
                                value={user && user.password ? user.password : ""}
                            />
                        </div>

                        <div className="p-g-12 p-md-6">
                            <Button variant="contained" size="medium" color='primary' onClick={this.handleLoginButton}
                                style={{ width: '100%', marginBottom: '15px' }}>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default LoginComponent;