'use strict';

var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var ApolloHooks = require("reason-apollo-hooks/src/ApolloHooks.bs.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var RollTable$SocialDmTools = require("./RollTable/RollTable.bs.js");

var ppx_printed_query = "query MyQuery  {\nlists  {\nid  \ntitle  \nitems  {\nid  \ntitle  \n}\n\n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var match = Js_dict.get(value$1, "lists");
  return {
          lists: match !== undefined ? Js_option.getExn(Js_json.decodeArray(Caml_option.valFromOption(match))).map((function (value) {
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
                        tmp = Js_exn.raiseError("graphql_ppx: Field id on type RngList is missing");
                      }
                      var match$3 = Js_dict.get(value$1, "title");
                      var tmp$1;
                      if (match$3 !== undefined) {
                        var value$3 = Caml_option.valFromOption(match$3);
                        var match$4 = Js_json.decodeString(value$3);
                        tmp$1 = match$4 !== undefined ? match$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                      } else {
                        tmp$1 = Js_exn.raiseError("graphql_ppx: Field title on type RngList is missing");
                      }
                      var match$5 = Js_dict.get(value$1, "items");
                      return {
                              id: tmp,
                              title: tmp$1,
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
                    }
                  })) : Js_exn.raiseError("graphql_ppx: Field lists on type Query is missing")
        };
}

function make(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeWithVariables(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeVariables(param) {
  return null;
}

function definition_002(graphql_ppx_use_json_variables_fn) {
  return 0;
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

var ListQuery = {
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

function App(Props) {
  var match = ApolloHooks.useQuery(undefined, undefined, undefined, undefined, undefined, undefined, undefined, definition);
  var simple = match[0];
  var tmp;
  if (typeof simple === "number") {
    tmp = simple === /* Loading */0 ? React.createElement("div", undefined, "Loading") : "Something really went wrong here!";
  } else if (simple.tag) {
    console.log(simple[0]);
    tmp = "Something went wrong";
  } else {
    tmp = Belt_Array.map(simple[0].lists, (function (list) {
            if (list !== undefined) {
              var vals = Caml_option.valFromOption(list);
              var id = vals.id;
              var items = vals.items;
              var title = vals.title;
              var key = "rolltable-" + (String(id) + ("-" + (String(title) + "")));
              return React.createElement(RollTable$SocialDmTools.make, {
                          id: id,
                          items: items,
                          title: title,
                          key: key
                        });
            } else {
              return null;
            }
          }));
  }
  return React.createElement("main", {
              className: "container mx-auto max-w-xl my-8"
            }, React.createElement("header", {
                  className: "pb-1 px-3"
                }, React.createElement("h1", {
                      className: "text-blue-700 text-4xl"
                    }, "Social DM Tools!")), React.createElement("div", undefined, tmp));
}

var make$1 = App;

exports.ListQuery = ListQuery;
exports.make = make$1;
/* react Not a pure module */
