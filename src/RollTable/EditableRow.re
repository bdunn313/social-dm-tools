type state =
  | Viewing
  | Editing;

module RowWrapper = {
  [@react.component]
  let make = (~onDoubleClick=_ => (), ~children) =>
    <li className="ml-8 mr-2 py-2 px-1" onDoubleClick> children </li>;
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
      <div className="py-1 px-2 border-white border">
        {title |> ReasonReact.string}
      </div>
    </RowWrapper>
  | Editing =>
    <RowWrapper> <RowInput title onEdit onBlur=onEdit /> </RowWrapper>
  };
};
