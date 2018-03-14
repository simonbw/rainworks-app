import createContext from 'create-react-context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const Context = createContext({
  getNavigator: () => console.log('stubbed getNavigator called'),
  setNavigator: () => console.log('stubbed setNavigator called'),
});

export const NavigatorConsumer = Context.Consumer;

export class NavigatorProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  getProviderValue() {
    return {
      getNavigator: () => this._navigator,
      setNavigator: (navigator) => this._navigator = navigator,
    }
  }
  
  render() {
    return (
      <Context.Provider value={this.getProviderValue()}>
        {this.props.children || null}
      </Context.Provider>
    );
  }
}