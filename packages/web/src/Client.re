let inMemoryCache = ApolloInMemoryCache.createInMemoryCache();

/* Create an HTTP Link */
let httpLink = ApolloLinks.createHttpLink(~uri="http://localhost:9999", ());
let wsLink =
  ApolloLinks.webSocketLink({
    uri: "ws://localhost:9999/graphql",
    options: {
      reconnect: true,
      connectionParams: None,
    },
  });

let link =
  ApolloLinks.split(
    ({query}) => {
      let definition = ApolloUtilities.getMainDefinition(query);
      String.lowercase_ascii(definition.kind) == "operationdefinition"
      && String.lowercase_ascii(definition.operation) == "subscription";
    },
    wsLink,
    httpLink,
  );
let client = ReasonApollo.createApolloClient(~link, ~cache=inMemoryCache, ());
