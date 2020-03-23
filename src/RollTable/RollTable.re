type item = {
  id: int,
  title: string,
};
let testItems = [|
  {id: 1, title: "One"},
  {id: 2, title: "Two"},
  {id: 3, title: "Three"},
  {id: 4, title: "Four"},
  {id: 5, title: "Five"},
|];

[@react.component]
let make = () => {
  let (items, setItems) = React.useState(() => testItems);
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
    <ol> itemEls </ol>
  </>;
};
