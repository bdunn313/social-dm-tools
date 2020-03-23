'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var $$String = require("bs-platform/lib/js/string.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Webapi__Dom__Element = require("bs-webapi/src/Webapi/Webapi__Dom/Webapi__Dom__Element.js");

function EditableRow$RowInput(Props) {
  var onEdit = Props.onEdit;
  var title = Props.title;
  var inputEl = React.useRef(null);
  var match = React.useState((function () {
          return title;
        }));
  var setEditedVal = match[1];
  var editedVal = match[0];
  React.useEffect((function () {
          Belt_Option.map(Belt_Option.flatMap(Caml_option.nullable_to_opt(inputEl.current), Webapi__Dom__Element.asHtmlElement), (function (prim) {
                  prim.focus();
                  return /* () */0;
                }));
          return ;
        }));
  var handleEdit = function (param) {
    return Curry._1(onEdit, editedVal);
  };
  return React.createElement("input", {
              ref: inputEl,
              type: "text",
              onKeyUp: (function (e) {
                  var match = $$String.lowercase_ascii(e.key);
                  if (match === "enter") {
                    return Curry._1(onEdit, editedVal);
                  } else {
                    return /* () */0;
                  }
                }),
              onBlur: handleEdit,
              onChange: (function (e) {
                  var newVal = e.target.value;
                  return Curry._1(setEditedVal, (function (param) {
                                return newVal;
                              }));
                }),
              values: editedVal
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
