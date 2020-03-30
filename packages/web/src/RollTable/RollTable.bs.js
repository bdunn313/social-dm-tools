'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_math = require("bs-platform/lib/js/js_math.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var AddRow$SocialDmTools = require("./AddRow.bs.js");
var EditableRow$SocialDmTools = require("./EditableRow.bs.js");

function getRandomItem(items) {
  var selectedIndex = Js_math.random_int(0, items.length - 1 | 0);
  return Belt_Array.get(items, selectedIndex);
}

function RollTable(Props) {
  var id = Props.id;
  var items = Props.items;
  var title = Props.title;
  var match = React.useState((function () {
          return /* Cleared */1;
        }));
  var setRollState = match[1];
  var rollState = match[0];
  var itemEls = Belt_Array.map(items, (function (maybeItem) {
          if (maybeItem !== undefined) {
            var item = maybeItem;
            var title = item.title;
            var id = item.id;
            return React.createElement(EditableRow$SocialDmTools.make, {
                        id: id,
                        title: title,
                        selected: typeof rollState === "number" ? false : Caml_obj.caml_equal(rollState[0], item),
                        key: "row-" + (String(id) + ("-" + (String(title) + "")))
                      });
          } else {
            return null;
          }
        }));
  return React.createElement("section", {
              className: "flex flex-col bg-white rounded shadow-xl"
            }, React.createElement("header", {
                  className: "bg-gray-600 text-gray-200 px-3 py-2 rounded-t"
                }, React.createElement("h2", undefined, title)), React.createElement("div", {
                  className: "bg-gray-400 px-3 py-2"
                }, React.createElement(AddRow$SocialDmTools.make, {
                      listId: id
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
                      var tmp;
                      if (match !== undefined) {
                        var x = Caml_option.valFromOption(match);
                        tmp = x !== undefined ? /* Rolled */[x] : /* Cleared */1;
                      } else {
                        tmp = /* Cleared */1;
                      }
                      Curry._1(cb, tmp);
                      return /* () */0;
                    })
                }, "Roll!"));
}

var make = RollTable;

exports.getRandomItem = getRandomItem;
exports.make = make;
/* react Not a pure module */
