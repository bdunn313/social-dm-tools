'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var ApolloHooks = require("reason-apollo-hooks/src/ApolloHooks.bs.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var RowInput$SocialDmTools = require("./RowInput.bs.js");

var ppx_printed_query = "mutation CreateMutation($id: ID!, $newTitle: String!)  {\naddItem(id: $id, title: $newTitle)  {\nid  \ntitle  \nitems  {\nid  \ntitle  \n}\n\n}\n\n}\n";

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

function AddRow(Props) {
  var listId = Props.listId;
  var match = ApolloHooks.useMutation(undefined, undefined, undefined, undefined, undefined, undefined, definition);
  var createMutation = match[0];
  var create = function (newTitle) {
    Curry._6(createMutation, Caml_option.some(makeVariables(listId, newTitle, /* () */0)), undefined, undefined, undefined, undefined, /* () */0).then((function (result) {
            console.log("mutation result", result);
            return Promise.resolve(/* () */0);
          }));
    return /* () */0;
  };
  return React.createElement(RowInput$SocialDmTools.make, {
              onEdit: create,
              onBlur: (function (param) {
                  return /* () */0;
                }),
              title: ""
            });
}

var make$1 = AddRow;

exports.CreateMutation = CreateMutation;
exports.make = make$1;
/* react Not a pure module */
