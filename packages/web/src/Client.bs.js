'use strict';

var $$String = require("bs-platform/lib/js/string.js");
var ApolloLinks = require("reason-apollo/src/ApolloLinks.bs.js");
var ApolloLink = require("apollo-link");
var ReasonApollo = require("reason-apollo/src/ReasonApollo.bs.js");
var ApolloLinkWs = require("apollo-link-ws");
var ApolloUtilities = require("apollo-utilities");
var ApolloInMemoryCache = require("reason-apollo/src/ApolloInMemoryCache.bs.js");

var inMemoryCache = ApolloInMemoryCache.createInMemoryCache(undefined, undefined, /* () */0);

var httpLink = ApolloLinks.createHttpLink("http://localhost:9999", undefined, undefined, undefined, undefined, undefined, /* () */0);

var wsLink = new ApolloLinkWs.WebSocketLink({
      uri: "ws://localhost:9999/graphql",
      options: {
        reconnect: true,
        connectionParams: undefined
      }
    });

var link = ApolloLink.split((function (param) {
        var definition = ApolloUtilities.getMainDefinition(param.query);
        if ($$String.lowercase_ascii(definition.kind) === "operationdefinition") {
          return $$String.lowercase_ascii(definition.operation) === "subscription";
        } else {
          return false;
        }
      }), wsLink, httpLink);

var client = ReasonApollo.createApolloClient(link, inMemoryCache, undefined, undefined, undefined, undefined, /* () */0);

exports.inMemoryCache = inMemoryCache;
exports.httpLink = httpLink;
exports.wsLink = wsLink;
exports.link = link;
exports.client = client;
/* inMemoryCache Not a pure module */
