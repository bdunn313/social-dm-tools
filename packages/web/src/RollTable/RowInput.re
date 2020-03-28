[@react.component]
let make = (~onEdit, ~onBlur, ~title) => {
  let (editedVal, setEditedVal) = React.useState(() => title);
  let handleChange = newVal => setEditedVal(_ => newVal);
  let resetInput = () => setEditedVal(_ => title);

  <input
    className="rounded border-gray-500 border px-2 py-1 w-full"
    placeholder="Add a new entry and hit 'enter'"
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
