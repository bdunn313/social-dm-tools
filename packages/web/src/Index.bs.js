'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var App$SocialDmTools = require("./App.bs.js");
var ReactHooks = require("@apollo/react-hooks");
var Client$SocialDmTools = require("./Client.bs.js");

((require("./index.css")));

ReactDOMRe.renderToElementWithId(React.createElement(ReactHooks.ApolloProvider, {
          client: Client$SocialDmTools.client,
          children: React.createElement(App$SocialDmTools.make, { })
        }), "app");

/*  Not a pure module */
