import React from "react";
import ReactDOM from "react-dom";
import DemoAxios from "./demoaxios.js";
import DemoFetch from "./demofetch.js";
import DemoPOSTAxios from "./demoPOSTaxios.js"
import DemoPOSTFetch from "./demoPOSTfetch.js";


//Component App 
function App() {
  return (
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
      <DemoAxios titre="Récupération de la plus récente citation avec axios" />
      <DemoFetch titre="Récupération d'une citation aléatoire avec fetch" />
      <DemoPOSTAxios titre="Requête POST avec Axios" />
      <DemoPOSTFetch titre="Requête POST avec Fetch" />
    </div>
  );
}

/**
 * Render injecte le component App dans le div avec le id root dans index.html
 */
ReactDOM.render(<App />, document.getElementById("root"));
