import React from "react";
import axios from "axios";
import "./demo.css";

class DemoPOSTAxios extends React.Component {
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
    let citation = this.state.citation;

    axios
      .post("http://localhost:8080/create", { citation })
      .then((response) => this.setState({ message: response.status + " "+response.statusText }))
      .catch((error) => {
        this.setState({ error: true, message: error.message });
        console.error("There was an error!");
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

export default DemoPOSTAxios;
