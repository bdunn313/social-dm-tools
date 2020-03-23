'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var AddRow$SocialDmTools = require("./AddRow.bs.js");
var EditableRow$SocialDmTools = require("./EditableRow.bs.js");

function getMaxId(items) {
  return Belt_Array.reduce(items, 0, (function (curr, item) {
                if (item.id > curr) {
                  return item.id;
                } else {
                  return curr;
                }
              }));
}

function getNextId(items) {
  return getMaxId(items) + 1 | 0;
}

var Item = {
  getMaxId: getMaxId,
  getNextId: getNextId
};

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
  var create = function (title) {
    return Curry._1(setItems, (function (prev) {
                  return Belt_Array.concat(prev, [{
                                id: getMaxId(prev) + 1 | 0,
                                title: title
                              }]);
                }));
  };
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
  return React.createElement(React.Fragment, undefined, React.createElement("header", undefined, React.createElement("h1", undefined, "Table Name")), React.createElement("ol", undefined, itemEls, React.createElement(AddRow$SocialDmTools.make, {
                      onCreate: create
                    })));
}

var make = RollTable;

exports.Item = Item;
exports.testItems = testItems;
exports.make = make;
/* react Not a pure module */
