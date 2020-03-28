'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var ReactApollo = require("react-apollo");
var App$SocialDmTools = require("./App.bs.js");
var Client$SocialDmTools = require("./Client.bs.js");

((require("./index.css")));

ReactDOMRe.renderToElementWithId(React.createElement(ReactApollo.ApolloProvider, {
          client: Client$SocialDmTools.instance,
          children: React.createElement(App$SocialDmTools.make, { })
        }), "app");

/*  Not a pure module */
