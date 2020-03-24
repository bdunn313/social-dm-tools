'use strict';

var React = require("react");
var RollTable$SocialDmTools = require("./RollTable/RollTable.bs.js");

function App(Props) {
  return React.createElement("main", {
              className: "container mx-auto max-w-xl my-8"
            }, React.createElement("header", {
                  className: "pb-1 px-3"
                }, React.createElement("h1", {
                      className: "text-blue-700 text-4xl"
                    }, "Social DM Tools!")), React.createElement(RollTable$SocialDmTools.make, { }));
}

var make = App;

exports.make = make;
/* react Not a pure module */
