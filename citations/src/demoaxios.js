import React from "react";
import axios from "axios";
import "./demo.css";

class DemoAxios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      citation: "",
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/`)
      .then((res) => {
        // Transform the raw data by extracting the nested posts
        const citation = res.data;

        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        this.setState({
          citation,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        // Something went wrong. Save the error in state and re-render.
        this.setState({
          loading: false,
          error: err,
        });
      });
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return <div>Uh oh: {this.state.error.message}</div>;
  }

  renderUneCitation() {
    if (this.state.error) {
      return this.renderError();
    }
    return <p>{this.state.citation}</p>;
  }


  render() {
    return (
      <div id='carte'>
        <h1>{this.props.titre}</h1>
        {this.state.loading ? this.renderLoading() : this.renderUneCitation()}
      </div>
    );
  }
}

export default DemoAxios