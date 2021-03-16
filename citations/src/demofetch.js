import React from "react";
import "./demo.css";

class DemoFetch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      citation: null,
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    this.recupérerUneCitation();
    this.timer = setInterval(() => this.recupérerUneCitation(), 5000);
  }

  recupérerUneCitation() {
    fetch("http://localhost:8080/random")
      //Il faut traduire la réponse pour l'obtenir en format JSON
      .then((res) => res.json())
      .then(
        (res) => {
          this.setState({
            citation: res[0].citation,
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
        <h4 id="titre">{this.props.titre}</h4>
        {this.state.loading ? this.renderLoading() : this.renderUneCitation()}
      </div>
    );
  }
}

export default DemoFetch;
