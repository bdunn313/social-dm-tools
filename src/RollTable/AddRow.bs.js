'use strict';

var React = require("react");
var RowInput$SocialDmTools = require("./RowInput.bs.js");

function AddRow(Props) {
  var onCreate = Props.onCreate;
  return React.createElement(RowInput$SocialDmTools.make, {
              onEdit: onCreate,
              onBlur: (function (param) {
                  return /* () */0;
                }),
              title: ""
            });
}

var make = AddRow;

exports.make = make;
/* react Not a pure module */
