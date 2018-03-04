import createContext from 'create-react-context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SUBMISSIONS_URL } from '../urls';
import { getDeviceId, makeQueryString } from '../util';

const Context = createContext({});

export const SubmissionsConsumer = Context.Consumer;

export class SubmissionsProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      loading: false
    };
  }
  
  async componentDidMount() {
    await this.loadSubmissions();
  }
  
  loadSubmissions = async () => {
    this.setState({ loading: true });
    const response = await fetch(SUBMISSIONS_URL + makeQueryString({ device_uuid: getDeviceId() }));
    const submissions = await response.json();
    this.setState({ submissions, loading: false });
  };
  
  getProviderValue() {
    return {
      ...this.state,
      refresh: this.loadSubmissions,
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