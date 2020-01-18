import * as React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFilm } from "@fortawesome/free-solid-svg-icons";
import Growl from "../../common/components/growl/growl";

interface IProps {
  history: any;
}

interface IState {
  userMenu: any;
}

class MainNavigation extends React.Component<IProps, IState> {
  growl: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      userMenu: null
    };
  }

  handleMenuItemClick = menuUrl => {
    this.props.history.push(menuUrl);
  };

  public render() {
    return (
      <>
        <Growl ref={el => (this.growl = el)} />

        <NavLink exact to="/">
          <div className="app-navigation-item">
            <FontAwesomeIcon
              icon={faHome}
              size="2x"
              style={{ margin: "5px" }}
            />
            Home
          </div>
        </NavLink>
        <NavLink exact to="/movies">
          <div className="app-navigation-item">
            <FontAwesomeIcon
              icon={faFilm}
              size="2x"
              style={{ margin: "5px" }}
            />
            Movies
          </div>
        </NavLink>
      </>
    );
  }
}

export default withRouter(MainNavigation);
