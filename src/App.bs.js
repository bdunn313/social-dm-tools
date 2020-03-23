'use strict';

var React = require("react");
var RollTable$SocialDmTools = require("./RollTable/RollTable.bs.js");

function App(Props) {
  return React.createElement(React.Fragment, undefined, React.createElement("h1", undefined, "Social DM Tools!"), React.createElement(RollTable$SocialDmTools.make, { }));
}

var make = App;

exports.make = make;
/* react Not a pure module */
