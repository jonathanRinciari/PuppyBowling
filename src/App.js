import React, { Component, Fragment } from 'react';
import { RingLoader } from 'react-spinners';

import Navbar from './components/Navbar/Navbar';
import List from './components/List/List';

import './App.css';

class App extends Component {
  

  // Set Initial State

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      loading: false
    }
  }

  // Update Input Value When User Enters Text
  onTextChanged = (e) => {
    this.setState({
      value: e.target.value
    })
  };


  // Since The List Auto Populates, We simulate a async method of fetching the recipes by using
  // Set timeout to mock loading, we then remove the loading state, and pass back in the users previous input value
  // to repopulate the list

  onButtonPressed = e => {
    let valueHolder = ''
    setTimeout(() => {
      this.setState(prevState => {
        valueHolder = prevState.value;
        return {
          loading: true,
          value: ''
        }
      })  
    }, 400);
    
    setTimeout(() => {
      this.setState({
        loading: false,
        value: valueHolder
      })
    }, 3000);
  }
  

  // Determines what is rendered to the user, either the list or if the button was pressed a loading icon
  renderContent = () => {
    if(!this.state.loading) {
      return (
        <Fragment>
          <div className="InputContainer">
            <input className="Input" placeholder="Search For.." type="text" onChange={this.onTextChanged} value={this.state.value} />
            <div onClick={this.onButtonPressed} className="Button">
              <p style={{ fontFamily: 'times-roman' }}> Submit </p>
            </div>
          </div>
          <List loading={this.state.loading} query={this.state.value} />
        </Fragment>
      )
    } else if(this.state.loading) {
      return (
        <div className="SpinnerContainer">
          <RingLoader 
            color={'#123abc'}
            loading={this.state.loading} 
          />
        </div>
      )
    }
  }

  // Clears the search bar when home is pressed
  onHomeClicked = () => {
    this.setState({
      value: ''
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar onClick={this.onHomeClicked}/>
        <div className="Content">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default App;
