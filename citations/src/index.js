import React from "react";
import ReactDOM from "react-dom";
import DemoAxios from "./demoaxios.js";
import DemoFetch from "./demofetch.js";


//Component App 
function App() {
  return (
    <div>
      <DemoAxios titre="Récupération de la citation avec axios" />
      <DemoAxios titre="Récupération de la citation avec axios 2" />
      <DemoFetch titre="Récupération de la citation avec fetch" />
    </div>
  );
}

/**
 * Render injecte le component App dans le div avec le id root dans index.html
 */
ReactDOM.render(<App />, document.getElementById("root"));
