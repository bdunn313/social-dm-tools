type item = {
  id: string,
  title: string,
};

type rollState =
  | Rolling
  | Rolled(item)
  | Cleared;

module CreateMutation = [%graphql
  {|
  mutation MyMutation($id: String!, $newTitle:String!)
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

let getRandomItem = items => {
  let selectedIndex = Js.Math.random_int(0, items->Belt.Array.length - 1);
  items->Belt.Array.get(selectedIndex);
};

[@react.component]
let make = (~id, ~items: array(option(item)), ~title) => {
  let (rollState, setRollState) = React.useState(() => Cleared);
  let (createMutation, _simple, _full) =
    ApolloHooks.useMutation(CreateMutation.definition);
  // let update = (item, newTitle) =>
  //   setItems(prev =>
  //     prev->Belt.Array.map(x => x == item ? {...x, title: newTitle} : x)
  //   );
  let create = newTitle => {
    createMutation(
      ~variables=CreateMutation.makeVariables(~id, ~newTitle, ()),
      (),
    )
    |> Js.Promise.then_(result => {
         Js.log2("mutation result", result);
         Js.Promise.resolve();
       })
    |> ignore;
  };

  let update = (_item, _newTitle) => ();
  let rollForItem = cb => {
    cb(
      switch (items->getRandomItem) {
      | Some(x) =>
        switch (x) {
        | Some(y) => Rolled(y)
        | None => Cleared
        }
      | None => Cleared
      },
    );
    ();
  };
  let itemEls =
    items->Belt.Array.map(maybeItem =>
      switch (maybeItem) {
      | None => React.null
      | Some({id, title} as item) =>
        <EditableRow
          key={j|row-$id-$title|j}
          title
          onSave={newTitle => item->update(newTitle)}
          selected={
            switch (rollState) {
            | Rolled(x) => x == item
            | _ => false
            }
          }
        />
      }
    )
    |> ReasonReact.array;

  <section className="flex flex-col bg-white rounded shadow-xl">
    <header className="bg-gray-600 text-gray-200 px-3 py-2 rounded-t">
      <h2> {title |> React.string} </h2>
    </header>
    <div className="bg-gray-400 px-3 py-2"> <AddRow onCreate=create /> </div>
    <ol className="list-decimal"> itemEls </ol>
    <button
      className="p-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:shadow-outline text-white"
      disabled={
        switch (rollState) {
        | Rolling => true
        | _ => false
        }
      }
      onClick={_ => {
        setRollState(_ => Rolling);
        rollForItem(x => setRollState(_ => x));
      }}>
      {"Roll!" |> React.string}
    </button>
  </section>;
};
