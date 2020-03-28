module Item = {
  type t = {
    id: int,
    title: string,
  };

  let getMaxId = (items: array(t)) =>
    items->Belt.Array.reduce(0, (curr, item) =>
      item.id > curr ? item.id : curr
    );

  let getNextId = items => getMaxId(items) + 1;

  let getRandomItem = items => {
    let selectedIndex = Js.Math.random_int(0, items->Belt.Array.length - 1);
    items->Belt.Array.get(selectedIndex);
  };
};

let testItems: array(Item.t) = [|
  {id: 1, title: "One"},
  {id: 2, title: "Two"},
  {id: 3, title: "Three"},
  {id: 4, title: "Four"},
  {id: 5, title: "Five"},
|];

type rollState =
  | Rolling
  | Rolled(Item.t)
  | Cleared;

[@react.component]
let make = () => {
  let (items, setItems) = React.useState(() => testItems);
  let (rollState, setRollState) = React.useState(() => Cleared);

  let create = title =>
    setItems(prev =>
      prev->Belt.Array.concat([|{id: prev->Item.getNextId, title}|])
    );
  let update = (item, newTitle) =>
    setItems(prev =>
      prev->Belt.Array.map(x => x == item ? {...x, title: newTitle} : x)
    );
  let rollForItem = cb => {
    cb(
      switch (items->Item.getRandomItem) {
      | Some(x) => Rolled(x)
      | None => Cleared
      },
    );
    ();
  };
  let itemEls =
    items->Belt.Array.map(({id, title} as item) =>
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
    )
    |> ReasonReact.array;

  <section className="flex flex-col bg-white rounded shadow-xl">
    <header className="bg-gray-400 px-3 py-2 rounded-t">
      <AddRow onCreate=create />
    </header>
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
