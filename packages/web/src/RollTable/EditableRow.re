module UpdateMutation = [%graphql
  {|
  mutation UpdateMutation($id: ID!, $newTitle: String!) {
    updateItem(id: $id, title: $newTitle) {
      id
      title
    }
  }
|}
];

module RemoveMutation = [%graphql
  {|
  mutation RemoveMutation($id: ID!) {
    removeItem(id: $id) {
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

type state =
  | Viewing
  | Editing;

[@react.component]
let make = (~id, ~title="", ~selected) => {
  let (state, setState) = React.useState(_ => Viewing);
  let (updateMutation, _, _) =
    ApolloHooks.useMutation(UpdateMutation.definition);
  let (removeMutation, _, _) =
    ApolloHooks.useMutation(
      ~variables=RemoveMutation.makeVariables(~id, ()),
      RemoveMutation.definition,
    );
  let onEdit = newTitle => {
    setState(_ => Viewing);
    switch (newTitle) {
    | "" => ()
    | x =>
      updateMutation(
        ~variables=UpdateMutation.makeVariables(~id, ~newTitle=x, ()),
        (),
      )
      |> Js.Promise.then_(result => {
           Js.log2("mutation result", result);
           Js.Promise.resolve();
         })
      |> ignore
    };
  };
  let onRemove = _ => removeMutation() |> ignore;
  switch (state) {
  | Viewing =>
    let borderColor = selected ? "border-blue-300" : "border-white";
    <RowWrapper onRemove onDoubleClick={_ => setState(_ => Editing)} selected>
      <div className={"py-1 px-2 border " ++ borderColor}>
        {title |> ReasonReact.string}
      </div>
    </RowWrapper>;
  | Editing =>
    <RowWrapper onRemove selected>
      <RowInput title onEdit onBlur=onEdit />
    </RowWrapper>
  };
};
