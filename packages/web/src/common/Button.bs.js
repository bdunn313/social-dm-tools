'use strict';

var React = require("react");

function Button(Props) {
  var onClick = Props.onClick;
  var children = Props.children;
  return React.createElement("button", {
              className: "rounded-sm px-3 text-gray-700 hover:text-gray-800 bg-gray-400 hover:bg-gray-500",
              onClick: onClick
            }, children);
}

var make = Button;

exports.make = make;
/* react Not a pure module */
