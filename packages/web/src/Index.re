[%bs.raw {|require("./index.css")|}];
// Entry point
ReactDOMRe.renderToElementWithId(
  <ReasonApollo.Provider client=Client.client>
    <ApolloHooks.Provider client=Client.client> <App /> </ApolloHooks.Provider>
  </ReasonApollo.Provider>,
  "app",
);
