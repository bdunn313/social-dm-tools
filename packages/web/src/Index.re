[%bs.raw {|require("./index.css")|}];
// Entry point
ReactDOMRe.renderToElementWithId(
  <ApolloHooks.Provider client=Client.client> <App /> </ApolloHooks.Provider>,
  "app",
);
