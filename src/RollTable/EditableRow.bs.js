'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var $$String = require("bs-platform/lib/js/string.js");

function EditableRow$RowInput(Props) {
  var onEdit = Props.onEdit;
  var onBlur = Props.onBlur;
  var title = Props.title;
  var match = React.useState((function () {
          return title;
        }));
  var setEditedVal = match[1];
  var editedVal = match[0];
  return React.createElement("input", {
              autoFocus: true,
              type: "text",
              value: editedVal,
              onKeyUp: (function (e) {
                  var match = $$String.lowercase_ascii(e.key);
                  if (match === "enter") {
                    Curry._1(onEdit, editedVal);
                    return Curry._1(setEditedVal, (function (param) {
                                  return title;
                                }));
                  } else {
                    return /* () */0;
                  }
                }),
              onBlur: (function (param) {
                  return Curry._1(onBlur, editedVal);
                }),
              onChange: (function (e) {
                  var newVal = e.target.value;
                  return Curry._1(setEditedVal, (function (param) {
                                return newVal;
                              }));
                })
            });
}

var RowInput = {
  make: EditableRow$RowInput
};

function EditableRow(Props) {
  var titleOpt = Props.title;
  var onSave = Props.onSave;
  var title = titleOpt !== undefined ? titleOpt : "";
  var match = React.useState((function () {
          return /* Viewing */0;
        }));
  var setState = match[1];
  var onEdit = function (newTitle) {
    Curry._1(setState, (function (param) {
            return /* Viewing */0;
          }));
    return Curry._1(onSave, newTitle);
  };
  if (match[0]) {
    return React.createElement(EditableRow$RowInput, {
                onEdit: onEdit,
                onBlur: onEdit,
                title: title
              });
  } else {
    return React.createElement("li", {
                onDoubleClick: (function (param) {
                    return Curry._1(setState, (function (param) {
                                  return /* Editing */1;
                                }));
                  })
              }, title);
  }
}

var make = EditableRow;

exports.RowInput = RowInput;
exports.make = make;
/* react Not a pure module */
