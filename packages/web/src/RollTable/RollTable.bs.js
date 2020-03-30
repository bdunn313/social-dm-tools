'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_math = require("bs-platform/lib/js/js_math.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var ApolloHooks = require("reason-apollo-hooks/src/ApolloHooks.bs.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var AddRow$SocialDmTools = require("./AddRow.bs.js");
var EditableRow$SocialDmTools = require("./EditableRow.bs.js");

var ppx_printed_query = "mutation MyMutation($id: String!, $newTitle: String!)  {\naddItem(id: $id, title: $newTitle)  {\nid  \ntitle  \nitems  {\nid  \ntitle  \n}\n\n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var match = Js_dict.get(value$1, "addItem");
  var tmp;
  if (match !== undefined) {
    var value$2 = Js_option.getExn(Js_json.decodeObject(Caml_option.valFromOption(match)));
    var match$1 = Js_dict.get(value$2, "id");
    var tmp$1;
    if (match$1 !== undefined) {
      var value$3 = Caml_option.valFromOption(match$1);
      var match$2 = Js_json.decodeString(value$3);
      tmp$1 = match$2 !== undefined ? match$2 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
    } else {
      tmp$1 = Js_exn.raiseError("graphql_ppx: Field id on type RngList is missing");
    }
    var match$3 = Js_dict.get(value$2, "title");
    var tmp$2;
    if (match$3 !== undefined) {
      var value$4 = Caml_option.valFromOption(match$3);
      var match$4 = Js_json.decodeString(value$4);
      tmp$2 = match$4 !== undefined ? match$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$4));
    } else {
      tmp$2 = Js_exn.raiseError("graphql_ppx: Field title on type RngList is missing");
    }
    var match$5 = Js_dict.get(value$2, "items");
    tmp = {
      id: tmp$1,
      title: tmp$2,
      items: match$5 !== undefined ? Js_option.getExn(Js_json.decodeArray(Caml_option.valFromOption(match$5))).map((function (value) {
                var match = Js_json.decodeNull(value);
                if (match !== undefined) {
                  return ;
                } else {
                  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
                  var match$1 = Js_dict.get(value$1, "id");
                  var tmp;
                  if (match$1 !== undefined) {
                    var value$2 = Caml_option.valFromOption(match$1);
                    var match$2 = Js_json.decodeString(value$2);
                    tmp = match$2 !== undefined ? match$2 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$2));
                  } else {
                    tmp = Js_exn.raiseError("graphql_ppx: Field id on type RngListItem is missing");
                  }
                  var match$3 = Js_dict.get(value$1, "title");
                  var tmp$1;
                  if (match$3 !== undefined) {
                    var value$3 = Caml_option.valFromOption(match$3);
                    var match$4 = Js_json.decodeString(value$3);
                    tmp$1 = match$4 !== undefined ? match$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                  } else {
                    tmp$1 = Js_exn.raiseError("graphql_ppx: Field title on type RngListItem is missing");
                  }
                  return {
                          id: tmp,
                          title: tmp$1
                        };
                }
              })) : Js_exn.raiseError("graphql_ppx: Field items on type RngList is missing")
    };
  } else {
    tmp = Js_exn.raiseError("graphql_ppx: Field addItem on type Mutation is missing");
  }
  return {
          addItem: tmp
        };
}

function make(id, newTitle, param) {
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray([
                  /* tuple */[
                    "id",
                    id
                  ],
                  /* tuple */[
                    "newTitle",
                    newTitle
                  ]
                ].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse
        };
}

function makeWithVariables(variables) {
  var id = variables.id;
  var newTitle = variables.newTitle;
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray([
                  /* tuple */[
                    "id",
                    id
                  ],
                  /* tuple */[
                    "newTitle",
                    newTitle
                  ]
                ].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse
        };
}

function makeVariables(id, newTitle, param) {
  return Js_dict.fromArray([
                /* tuple */[
                  "id",
                  id
                ],
                /* tuple */[
                  "newTitle",
                  newTitle
                ]
              ].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function definition_002(graphql_ppx_use_json_variables_fn, id, newTitle, param) {
  return Curry._1(graphql_ppx_use_json_variables_fn, Js_dict.fromArray([
                    /* tuple */[
                      "id",
                      id
                    ],
                    /* tuple */[
                      "newTitle",
                      newTitle
                    ]
                  ].filter((function (param) {
                        return !Js_json.test(param[1], /* Null */5);
                      }))));
}

var definition = /* tuple */[
  parse,
  ppx_printed_query,
  definition_002
];

function ret_type(f) {
  return { };
}

var MT_Ret = { };

var CreateMutation = {
  ppx_printed_query: ppx_printed_query,
  query: ppx_printed_query,
  parse: parse,
  make: make,
  makeWithVariables: makeWithVariables,
  makeVariables: makeVariables,
  definition: definition,
  ret_type: ret_type,
  MT_Ret: MT_Ret
};

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
  var match$1 = ApolloHooks.useMutation(undefined, undefined, undefined, undefined, undefined, undefined, definition);
  var createMutation = match$1[0];
  var create = function (newTitle) {
    Curry._6(createMutation, Caml_option.some(makeVariables(id, newTitle, /* () */0)), undefined, undefined, undefined, undefined, /* () */0).then((function (result) {
            console.log("mutation result", result);
            return Promise.resolve(/* () */0);
          }));
    return /* () */0;
  };
  var itemEls = Belt_Array.map(items, (function (maybeItem) {
          if (maybeItem !== undefined) {
            var item = maybeItem;
            var title = item.title;
            return React.createElement(EditableRow$SocialDmTools.make, {
                        title: title,
                        onSave: (function (newTitle) {
                            return /* () */0;
                          }),
                        selected: typeof rollState === "number" ? false : Caml_obj.caml_equal(rollState[0], item),
                        key: "row-" + (String(item.id) + ("-" + (String(title) + "")))
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

var make$1 = RollTable;

exports.CreateMutation = CreateMutation;
exports.getRandomItem = getRandomItem;
exports.make = make$1;
/* react Not a pure module */
