import React from "react";
import "./demo.css";

class DemoPOSTFetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citation: null,
      message: null,
      error: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let citation = { citation: this.state.citation };
    fetch("http://localhost:8080/create", {
      // Précise le type de méthode
      method: "POST",
      //Headers de la requête
      headers: {
        "Content-Type": "application/json",
      },
      // Ajout de l'objet citation dans le corps de la requête 
      body: JSON.stringify(citation),
    })
      .then((response) => this.setState({ message: response.status + " "+response.statusText }))
      .catch((error) => {
        this.setState({ error: true, message: error.message });
      });
  }

  handleChange = (event) => {
    this.setState({ citation: event.target.value });
  };

  renderError() {
    return <div>Uh oh: {this.state.message}</div>;
  }

  renderSuccess() {
    return <div>{this.state.message}</div>;
  }

  render() {
    return (
      <div id="carte">
        <form onSubmit={this.handleSubmit}>
          <h4 id="titre">{this.props.titre}</h4>
          <label>
            Entrez une citation:
            <input type="text" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Envoyer la citation" />
        </form>
        {this.state.error ? this.renderError() : this.renderSuccess()}
      </div>
    );
  }
}

export default DemoPOSTFetch;
