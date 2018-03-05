import createContext from 'create-react-context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { REPORTS_URL } from '../urls';
import { getDeviceId, makeQueryString, showError } from '../util';

const Context = createContext({});

export const ReportsConsumer = Context.Consumer;

export class ReportsProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      loading: false
    };
  }
  
  async componentDidMount() {
    await this.loadReports();
  }
  
  loadReports = async () => {
    this.setState({ loading: true });
    const response = await fetch(REPORTS_URL + makeQueryString({ device_uuid: getDeviceId() }));
    if (!response.ok) {
      showError('Loading Reports Failed');
    } else {
      const reports = await response.json();
      this.setState({ reports, loading: false });
    }
  };
  
  submitReport = async (rainworkId, reportType) => {
    const body = JSON.stringify({
      'device_uuid': getDeviceId(),
      'rainwork_id': rainworkId,
      'report_type': reportType,
    });
    const response = await fetch(REPORTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    if (!response.ok) {
      showError('Submitting Report Failed')
    } else {
      const report = await response.json();
      this.setState({ reports: this.state.reports.concat([report]) })
    }
  };
  
  getReport = (rainworkId, reportType) => {
    return this.state.reports.find(
      (report) => report['report_type'] === reportType && report['rainwork_id'] === rainworkId);
  };
  
  getProviderValue() {
    return {
      ...this.state,
      getReport: this.getReport,
      refresh: this.loadReports,
      submitReport: this.submitReport,
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