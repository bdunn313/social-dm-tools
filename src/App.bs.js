'use strict';

var React = require("react");

function App(Props) {
  return React.createElement("h1", undefined, "HelloWorld!");
}

var make = App;

exports.make = make;
/* react Not a pure module */
