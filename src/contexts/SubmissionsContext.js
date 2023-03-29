import React, { Component, useState, useEffect } from "react";
// import createContext from "create-react-context";
import PropTypes from "prop-types";
import { SUBMISSIONS_URL } from "../constants/urls";
import { getDeviceId, makeQueryString } from "../../utils/util";
import { showError } from "../../utils/toastUtils";

const Context = React.createContext({});

export const SubmissionsConsumer = Context.Consumer;

// export class SubmissionsProvider extends Component {
//   static propTypes = {
//     children: PropTypes.node.isRequired,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       submissions: [],
//       loading: false,
//     };
//   }

//   async componentDidMount() {
//     await this.loadSubmissions();
//   }

//   loadSubmissions = async () => {
//     this.setState({ loading: true });
//     const response = await fetch(
//       SUBMISSIONS_URL + makeQueryString({ device_uuid: getDeviceId() })
//     );
//     if (!response.ok) {
//       showError("Loading Submissions Failed");
//       this.setState({ loading: false });
//     } else {
//       const submissions = await response.json();
//       submissions.sort(
//         (a, b) => new Date(b["created_at"]) - new Date(a["created_at"])
//       );
//       this.setState({ submissions, loading: false });
//     }
//   };

//   getSubmission = (id) => {
//     return this.state.submissions.find((s) => s["id"] === id);
//   };

//   getProviderValue() {
//     return {
//       ...this.state,
//       refresh: this.loadSubmissions,
//       getSubmission: this.getSubmission,
//     };
//   }

//   render() {
//     return (
//       <Context.Provider value={this.getProviderValue()}>
//         {this.props.children || null}
//       </Context.Provider>
//     );
//   }
// }

const SubmissionsProvider = (props) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSubmissions = async () => {
    // this.setState({ loading: true });
    setLoading(true);
    const response = await fetch(
      SUBMISSIONS_URL + makeQueryString({ device_uuid: getDeviceId() })
    );
    if (!response.ok) {
      showError("Loading Submissions Failed");
      // this.setState({ loading: false });
      setLoading(false);
    } else {
      const submissions = await response.json();
      submissions.sort(
        (a, b) => new Date(b["created_at"]) - new Date(a["created_at"])
      );
      // this.setState({ submissions, loading: false });
      setSubmissions(submissions);
      setLoading(false);
    }
  };

  const getSubmission = (id) => {
    return submissions.find((s) => s["id"] === id);
  };

  const getProviderValue = () => {
    return {
      // ...this.state,
      submissions,
      loading,
      refresh: loadSubmissions,
      getSubmission: getSubmission,
    };
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  return (
    <Context.Provider value={getProviderValue()}>
      {props.children || null}
    </Context.Provider>
  );
};

export default SubmissionsProvider;
