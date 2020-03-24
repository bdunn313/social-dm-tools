'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var RowInput$SocialDmTools = require("./RowInput.bs.js");

function EditableRow$RowWrapper(Props) {
  var onDoubleClickOpt = Props.onDoubleClick;
  var children = Props.children;
  var onDoubleClick = onDoubleClickOpt !== undefined ? onDoubleClickOpt : (function (param) {
        return /* () */0;
      });
  return React.createElement("li", {
              className: "ml-8 mr-2 py-2 px-1",
              onDoubleClick: onDoubleClick
            }, children);
}

var RowWrapper = {
  make: EditableRow$RowWrapper
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
    return React.createElement(EditableRow$RowWrapper, {
                children: React.createElement(RowInput$SocialDmTools.make, {
                      onEdit: onEdit,
                      onBlur: onEdit,
                      title: title
                    })
              });
  } else {
    return React.createElement(EditableRow$RowWrapper, {
                onDoubleClick: (function (param) {
                    return Curry._1(setState, (function (param) {
                                  return /* Editing */1;
                                }));
                  }),
                children: React.createElement("div", {
                      className: "py-1 px-2 border-white border"
                    }, title)
              });
  }
}

var make = EditableRow;

exports.RowWrapper = RowWrapper;
exports.make = make;
/* react Not a pure module */
