[%bs.raw {|require("./index.css")|}];
// Entry point
ReactDOMRe.renderToElementWithId(
  <ReasonApollo.Provider client=Client.instance>
    <App />
  </ReasonApollo.Provider>,
  "app",
);
