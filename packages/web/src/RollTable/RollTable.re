type item = {
  .
  "id": string,
  "title": string,
};

type rollState =
  | Rolling
  | Rolled(item)
  | Cleared;

let getRandomItem = items => {
  let selectedIndex = Js.Math.random_int(0, items->Belt.Array.length - 1);
  items->Belt.Array.get(selectedIndex);
};

[@react.component]
let make = (~id, ~items, ~title) => {
  let (rollState, setRollState) = React.useState(() => Cleared);
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

  <section className="flex flex-col bg-white rounded shadow-xl mb-6">
    <header className="bg-gray-600 text-gray-200 px-3 py-3 rounded-t">
      <h2> {title |> React.string} </h2>
    </header>
    <div className="bg-gray-400 px-3 py-2"> <AddRow listId=id /> </div>
    <ol className="list-decimal">
      {items->Belt.Array.map(maybeItem =>
         switch (maybeItem) {
         | None => React.null
         | Some(item) =>
           let id = item##id;
           let title = item##title;
           <EditableRow
             key={j|row-$id-$title|j}
             id
             title
             selected={
               switch (rollState) {
               | Rolled(x) => x == item
               | _ => false
               }
             }
           />;
         }
       )
       |> ReasonReact.array}
    </ol>
    <button
      className="p-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:shadow-outline text-white rounded-b"
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
