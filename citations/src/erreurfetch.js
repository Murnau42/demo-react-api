import React from "react";
import "./demo.css";

class ErreurFetch extends React.Component {
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
  }

  recupérerUneCitation() {
    // Les erreurs http telles que 404 doivent être gérées manuellement
    fetch("http://localhost:8080/inexistant")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status +" "+ res.statusText);
        }
      })
      .then((res) => {
        this.setState({
          citation: res[0].citation,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
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
      <div id="carte">
        <h4 id="titre">{this.props.titre}</h4>
        {this.state.loading ? this.renderLoading() : this.renderUneCitation()}
      </div>
    );
  }
}

export default ErreurFetch;
