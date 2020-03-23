'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var App$SocialDmTools = require("./App.bs.js");

((require("./index.css")));

ReactDOMRe.renderToElementWithId(React.createElement(App$SocialDmTools.make, { }), "app");

/*  Not a pure module */
