type state =
  | Viewing
  | Editing;

module RowInput = {
  [@react.component]
  let make = (~onEdit, ~onBlur, ~title) => {
    let (editedVal, setEditedVal) = React.useState(() => title);
    let handleChange = newVal => setEditedVal(_ => newVal);
    let resetInput = () => setEditedVal(_ => title);
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
    />;
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
    <li onDoubleClick={_ => setState(_ => Editing)}>
      {title |> ReasonReact.string}
    </li>
  | Editing => <RowInput title onEdit onBlur=onEdit />
  };
};
