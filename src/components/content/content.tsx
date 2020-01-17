import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import HomeComponent from '../home/homeComponent';
import MovieComponent from '../movie/movieComponent';
import LoginComponent from '../login/loginComponent';

const NoMatch = () => (
    <div className="app-content">
        <h3>
            URL address <code>{}</code> not match.
    </h3>
    </div>
);

interface IProps {
    isUserLogged: boolean;
}

interface IState {
}

class Content extends React.Component<IProps, IState> {

    //аuthService = new AuthService();

    public render() {

        return (
            <>
                <Switch>
                    <Route exact path="/" component={HomeComponent} />
                    <Route exact path="/index.html" component={HomeComponent} />
                    <Route exact path="/movies" component={MovieComponent} />
                    <Route exact path="/login" component={LoginComponent} />

                    {/* <Route exact path="/user/dashboard"
            component={this.аuthService.isAuthenticated() ? UserDashboardComponent : NotAuthenticatedComponent} /> */}

                    <Route component={NoMatch} />
                </Switch>

            </>

        )
    }
}


const mapsStateToProps = state => {
    return {
        isUserLogged: state.common.isUserLogged
    };
}

export default connect(mapsStateToProps, null)(Content);