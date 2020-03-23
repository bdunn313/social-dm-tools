type state =
  | Viewing
  | Editing;

module RowInput = {
  [@react.component]
  let make = (~onEdit, ~title) => {
    let inputEl = React.useRef(Js.Nullable.null);
    let (editedVal, setEditedVal) = React.useState(() => title);
    React.useEffect(() => {
      inputEl
      ->React.Ref.current
      ->Js.Nullable.toOption
      ->Belt.Option.flatMap(Webapi.Dom.Element.asHtmlElement)
      ->Belt.Option.map(Webapi.Dom.HtmlElement.focus)
      ->ignore; // FIXME: I'm doing something wrong here.
      None;
    });

    let handleChange = newVal => setEditedVal(_ => newVal);
    let handleEdit = _ => onEdit(editedVal);

    <input
      ref={ReactDOMRe.Ref.domRef(inputEl)}
      type_="text"
      onChange={e => e->ReactEvent.Form.target##value->handleChange}
      onBlur=handleEdit
      onKeyUp={e =>
        switch (e->ReactEvent.Keyboard.key->String.lowercase_ascii) {
        | "enter" => handleEdit(e)
        | _ => ()
        }
      }
      values=editedVal
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
  | Editing => <RowInput title onEdit />
  };
};
