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

module RowWrapper = {
  [@react.component]
  let make = (~onDoubleClick=_ => (), ~onRemove, ~selected, ~children) => {
    let baseClasses = "ml-8 mr-2 py-2 px-1 flex flex-row";
    let className =
      selected ? baseClasses ++ " bg-blue-300 text-blue-700" : baseClasses;
    <li className onDoubleClick>
      <div> children </div>
      <button onClick=onRemove> {"del" |> React.string} </button>
    </li>;
  };
};

type state =
  | Viewing
  | Editing;

[@react.component]
let make = (~id, ~title="", ~selected) => {
  let (state, setState) = React.useState(_ => Viewing);
  let (updateMutation, _, _) =
    ApolloHooks.useMutation(UpdateMutation.definition);
  // let deleteCacheUpdate = (client, mutationResult) => {
  //   let data =
  //     mutationResult##data
  //     ->Belt.Option.flatMap(result => result##updatePerson);
  //   switch (data) {
  //   | Some(person) =>
  //     FilterByNameCache.updateCache(client, person, filterName)
  //   | None => ()
  //   };
  // };
  let (removeMutation, _, _) =
    ApolloHooks.useMutation(
      ~variables=RemoveMutation.makeVariables(~id, ()),
      // ~update=updateAfterDelete,
      RemoveMutation.definition,
    );
  let onEdit = newTitle => {
    setState(_ => Viewing);
    updateMutation(
      ~variables=UpdateMutation.makeVariables(~id, ~newTitle, ()),
      (),
    )
    |> Js.Promise.then_(result => {
         Js.log2("mutation result", result);
         Js.Promise.resolve();
       })
    |> ignore;
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
