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
    this.recupérerDernièreCitation();
    this.timer = setInterval(() => this.recupérerDernièreCitation(), 3000);
  }

  recupérerDernièreCitation() {
    axios
      .get(`http://localhost:8080/latest`)
      .then((res) => {

        //Axios se charge d'obtenir l'objet JSON
        const citation = res.data[0].citation;


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
      <div id="carte">
        <h4 id="titre">{this.props.titre}</h4>
        {this.state.loading ? this.renderLoading() : this.renderUneCitation()}
      </div>
    );
  }
}

export default DemoAxios;
