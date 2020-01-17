import React from 'react';
import './App.css';
import Content from './components/content/content'
import { BrowserRouter } from "react-router-dom";

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
        <Content />
      </BrowserRouter>
    );
  }
}

export default App;
