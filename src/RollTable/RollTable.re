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
};

let testItems: array(Item.t) = [|
  {id: 1, title: "One"},
  {id: 2, title: "Two"},
  {id: 3, title: "Three"},
  {id: 4, title: "Four"},
  {id: 5, title: "Five"},
|];

[@react.component]
let make = () => {
  let (items, setItems) = React.useState(() => testItems);
  let create = title =>
    setItems(prev =>
      prev->Belt.Array.concat([|{id: prev->Item.getNextId, title}|])
    );
  let update = (item, newTitle) =>
    setItems(prev =>
      prev->Belt.Array.map(x => x == item ? {...x, title: newTitle} : x)
    );
  let itemEls =
    items->Belt.Array.map(({id, title} as item) =>
      <EditableRow
        key={j|row-$id-$title|j}
        title
        onSave={newTitle => item->update(newTitle)}
      />
    )
    |> ReasonReact.array;

  <>
    <header> <h1> {"Table Name" |> ReasonReact.string} </h1> </header>
    <ol> <AddRow onCreate=create /> itemEls </ol>
  </>;
};
