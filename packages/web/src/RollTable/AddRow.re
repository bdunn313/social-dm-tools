module CreateMutation = [%graphql
  {|
  mutation CreateMutation($id: ID!, $newTitle:String!)
  {
    addItem(id: $id, title: $newTitle) {
      id
      title
      items {
        id
        title
      }
    }
  }
|}
];

[@react.component]
let make = (~listId) => {
  let (createMutation, _, _) =
    ApolloHooks.useMutation(CreateMutation.definition);
  let makeVariables = CreateMutation.makeVariables(~id=listId);
  let create = newTitle => {
    createMutation(~variables=makeVariables(~newTitle, ()), ())
    |> Js.Promise.then_(result => {
         Js.log2("mutation result", result);
         Js.Promise.resolve();
       })
    |> ignore;
  };
  <RowInput title="" onEdit=create onBlur={_ => ()} />;
};
