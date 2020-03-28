'use strict';

var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var RollTable$SocialDmTools = require("./RollTable/RollTable.bs.js");

var ppx_printed_query = "query MyQuery  {\nbooks  {\ntitle  \n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var match = Js_dict.get(value$1, "books");
  var tmp;
  if (match !== undefined) {
    var value$2 = Caml_option.valFromOption(match);
    var match$1 = Js_json.decodeNull(value$2);
    tmp = match$1 !== undefined ? undefined : Js_option.getExn(Js_json.decodeArray(value$2)).map((function (value) {
              var match = Js_json.decodeNull(value);
              if (match !== undefined) {
                return ;
              } else {
                var value$1 = Js_option.getExn(Js_json.decodeObject(value));
                var match$1 = Js_dict.get(value$1, "title");
                var tmp;
                if (match$1 !== undefined) {
                  var value$2 = Caml_option.valFromOption(match$1);
                  var match$2 = Js_json.decodeNull(value$2);
                  if (match$2 !== undefined) {
                    tmp = undefined;
                  } else {
                    var match$3 = Js_json.decodeString(value$2);
                    tmp = match$3 !== undefined ? match$3 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$2));
                  }
                } else {
                  tmp = undefined;
                }
                return {
                        title: tmp
                      };
              }
            }));
  } else {
    tmp = undefined;
  }
  return {
          books: tmp
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

var HeroQuery = {
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
  return React.createElement("main", {
              className: "container mx-auto max-w-xl my-8"
            }, React.createElement("header", {
                  className: "pb-1 px-3"
                }, React.createElement("h1", {
                      className: "text-blue-700 text-4xl"
                    }, "Social DM Tools!")), React.createElement(RollTable$SocialDmTools.make, { }));
}

var make$1 = App;

exports.HeroQuery = HeroQuery;
exports.make = make$1;
/* react Not a pure module */
