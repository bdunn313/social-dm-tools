type state =
  | Viewing
  | Editing;

module RowWrapper = {
  [@react.component]
  let make = (~onDoubleClick=_ => (), ~children) =>
    <li className="px-6 py-2" onDoubleClick> children </li>;
};

module RowInput = {
  [@react.component]
  let make = (~onEdit, ~onBlur, ~title) => {
    let (editedVal, setEditedVal) = React.useState(() => title);
    let handleChange = newVal => setEditedVal(_ => newVal);
    let resetInput = () => setEditedVal(_ => title);
    <RowWrapper>
      <input
        autoFocus=true
        type_="text"
        onChange={e => e->ReactEvent.Form.target##value->handleChange}
        onBlur={_ => onBlur(editedVal)}
        onKeyUp={e =>
          switch (e->ReactEvent.Keyboard.key->String.lowercase_ascii) {
          | "enter" =>
            onEdit(editedVal);
            resetInput();
          | _ => ()
          }
        }
        value=editedVal
      />
    </RowWrapper>;
  };
};

[@react.component]
let make = (~title="", ~onSave) => {
  let (state, setState) = React.useState(_ => Viewing);
  let onEdit = newTitle => {
    setState(_ => Viewing);
    onSave(newTitle);
  };
  switch (state) {
  | Viewing =>
    <RowWrapper onDoubleClick={_ => setState(_ => Editing)}>
      {title |> ReasonReact.string}
    </RowWrapper>
  | Editing => <RowInput title onEdit onBlur=onEdit />
  };
};
