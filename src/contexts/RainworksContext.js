import React, { Component } from "react";
// import createContext from "create-react-context";
import PropTypes from "prop-types";
import { RAINWORKS_URL } from "../constants/urls";
import { showError } from "../../utils/toastUtils";

const Context = React.createContext({});

export const RainworksConsumer = Context.Consumer;

export class RainworksProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      rainworks: [], // all rainworks
      galleryRainworks: [], // just the ones with images
      activeRainworks: [], // just the ones where approval_status === 'accepted'
      expiredRainworks: [], // just the ones where approval_status === 'expired'
      loading: false,
    };
  }

  async componentDidMount() {
    await this.loadRainworks();
  }

  loadRainworks = async () => {
    this.setState({ loading: true });
    const response = await fetch(RAINWORKS_URL);
    if (!response.ok) {
      showError("Loading rainworks failed");
    } else {
      const rainworks = await response.json();
      rainworks.sort(
        (a, b) =>
          new Date(b["installation_date"]) - new Date(a["installation_date"])
      );
      this.setState({
        rainworks,
        galleryRainworks: rainworks.filter(
          (rainwork) => rainwork["image_url"] && rainwork["show_in_gallery"]
        ),
        activeRainworks: rainworks.filter(
          (rainwork) => rainwork["approval_status"] === "accepted"
        ),
        expiredRainworks: rainworks.filter(
          (rainwork) => rainwork["approval_status"] === "expired"
        ),
        loading: false,
      });
    }
  };

  refreshRainwork = async (rainworkId) => {
    // TODO: Make it possible to just refresh data on one rainwork
  };

  getProviderValue() {
    return {
      ...this.state,
      refreshAll: this.loadRainworks,
      refreshRainwork: this.refreshRainwork,
    };
  }

  render() {
    return (
      <Context.Provider value={this.getProviderValue()}>
        {this.props.children || null}
      </Context.Provider>
    );
  }
}
