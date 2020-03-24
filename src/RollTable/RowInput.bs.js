'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var $$String = require("bs-platform/lib/js/string.js");

function RowInput(Props) {
  var onEdit = Props.onEdit;
  var onBlur = Props.onBlur;
  var title = Props.title;
  var match = React.useState((function () {
          return title;
        }));
  var setEditedVal = match[1];
  var editedVal = match[0];
  return React.createElement("input", {
              className: "rounded border-gray-500 border px-2 py-1 w-full",
              autoFocus: true,
              placeholder: "Add a new entry and hit 'enter'",
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

var make = RowInput;

exports.make = make;
/* react Not a pure module */
