'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_math = require("bs-platform/lib/js/js_math.js");
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

function getRandomItem(items) {
  var selectedIndex = Js_math.random_int(0, items.length - 1 | 0);
  return Belt_Array.get(items, selectedIndex);
}

var Item = {
  getMaxId: getMaxId,
  getNextId: getNextId,
  getRandomItem: getRandomItem
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
  var items = match[0];
  var match$1 = React.useState((function () {
          return /* Cleared */1;
        }));
  var setRollState = match$1[1];
  var rollState = match$1[0];
  var create = function (title) {
    return Curry._1(setItems, (function (prev) {
                  return Belt_Array.concat(prev, [{
                                id: getMaxId(prev) + 1 | 0,
                                title: title
                              }]);
                }));
  };
  var itemEls = Belt_Array.map(items, (function (item) {
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
                      selected: typeof rollState === "number" ? false : Caml_obj.caml_equal(rollState[0], item),
                      key: "row-" + (String(item.id) + ("-" + (String(title) + "")))
                    });
        }));
  return React.createElement("section", {
              className: "flex flex-col bg-white rounded shadow-xl"
            }, React.createElement("header", {
                  className: "bg-gray-400 px-3 py-2 rounded-t"
                }, React.createElement(AddRow$SocialDmTools.make, {
                      onCreate: create
                    })), React.createElement("ol", {
                  className: "list-decimal"
                }, itemEls), React.createElement("button", {
                  className: "p-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:shadow-outline text-white",
                  disabled: typeof rollState === "number" ? rollState === 0 : false,
                  onClick: (function (param) {
                      Curry._1(setRollState, (function (param) {
                              return /* Rolling */0;
                            }));
                      var cb = function (x) {
                        return Curry._1(setRollState, (function (param) {
                                      return x;
                                    }));
                      };
                      var match = getRandomItem(items);
                      Curry._1(cb, match !== undefined ? /* Rolled */[match] : /* Cleared */1);
                      return /* () */0;
                    })
                }, "Roll!"));
}

var make = RollTable;

exports.Item = Item;
exports.testItems = testItems;
exports.make = make;
/* react Not a pure module */
