'use strict';

var React = require("react");
var EditableRow$SocialDmTools = require("./EditableRow.bs.js");

function AddRow(Props) {
  var onCreate = Props.onCreate;
  return React.createElement(EditableRow$SocialDmTools.RowInput.make, {
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
