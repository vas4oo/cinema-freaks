import React from 'react';
import './App.css';
import Content from './components/content/content'
import { BrowserRouter } from "react-router-dom";
import MainNavigation from './components/navigation/mainNavigation';
import HeaderComponent from './components/header/headerComponent';
import FooterComponent from './components/footer/footerComponent';

interface IState {
}

interface IProps {
  location?: any,
  match?: any
}


class App extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app-navigation">
          <MainNavigation />
        </div>

        <div>
          <HeaderComponent />
        </div>
        <Content />

        <div className="app-footer-web">
          <FooterComponent />
        </div>


      </BrowserRouter>
    );
  }
}

export default App;
