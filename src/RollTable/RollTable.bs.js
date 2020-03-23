'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var EditableRow$SocialDmTools = require("./EditableRow.bs.js");

var testItems = [
  {
    id: 1,
    title: "One"
  },
  {
    id: 2,
    title: "Two"
  },
  {
    id: 3,
    title: "Three"
  },
  {
    id: 4,
    title: "Four"
  },
  {
    id: 5,
    title: "Five"
  }
];

function RollTable(Props) {
  var match = React.useState((function () {
          return testItems;
        }));
  var setItems = match[1];
  var itemEls = Belt_Array.map(match[0], (function (item) {
          var title = item.title;
          return React.createElement(EditableRow$SocialDmTools.make, {
                      title: title,
                      onSave: (function (newTitle) {
                          var item$1 = item;
                          var newTitle$1 = newTitle;
                          return Curry._1(setItems, (function (prev) {
                                        return Belt_Array.map(prev, (function (x) {
                                                      if (Caml_obj.caml_equal(x, item$1)) {
                                                        return {
                                                                id: x.id,
                                                                title: newTitle$1
                                                              };
                                                      } else {
                                                        return x;
                                                      }
                                                    }));
                                      }));
                        }),
                      key: "row-" + (String(item.id) + ("-" + (String(title) + "")))
                    });
        }));
  return React.createElement(React.Fragment, undefined, React.createElement("header", undefined, React.createElement("h1", undefined, "Table Name")), React.createElement("ol", undefined, itemEls));
}

var make = RollTable;

exports.testItems = testItems;
exports.make = make;
/* react Not a pure module */
