import React from "react";
import "./demo.css";

class DemoFetch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      citation: "",
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    this.recupérerUneCitation();
    this.timer = setInterval(() => this.recupérerUneCitation(), 3000);
  }

  recupérerUneCitation() {
    fetch("http://localhost:8080/surprise")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            citation: result[0].citation,
            loading: false,
            error: null,
          });
        },
        (error) => {
          this.setState({
            loading: false,
            error: error,
          });
        }
      );
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
      <div id="carte">
        <h3>{this.props.titre}</h3>
        {this.state.loading ? this.renderLoading() : this.renderUneCitation()}
      </div>
    );
  }
}

export default DemoFetch;
