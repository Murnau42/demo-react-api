import React from "react";
import axios from "axios";
import "./demo.css";

class ErreurAxios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      citation: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.recupérerDernièreCitation();
  }

  recupérerDernièreCitation() {
    //Une requête provoquant une erreur http deviendra  une Rejected Promise
    axios.get(`http://localhost:8080/inexistant`).then(
      (res) => {
        let citation = res.data[0].citation;
        this.setState({
          citation,
          loading: false,
          error: null,
        });
      },
      (err) => {
        this.setState({
          loading: false,
          error: err,
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

export default ErreurAxios;
