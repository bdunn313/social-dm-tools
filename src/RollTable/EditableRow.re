type state =
  | Viewing
  | Editing;

module RowWrapper = {
  [@react.component]
  let make = (~onDoubleClick=_ => (), ~selected, ~children) => {
    let baseClasses = "ml-8 mr-2 py-2 px-1";
    let className =
      selected ? baseClasses ++ " bg-blue-300 text-blue-700" : baseClasses;
    <li className onDoubleClick> children </li>;
  };
};

[@react.component]
let make = (~title="", ~onSave, ~selected) => {
  let (state, setState) = React.useState(_ => Viewing);
  let onEdit = newTitle => {
    setState(_ => Viewing);
    onSave(newTitle);
  };
  switch (state) {
  | Viewing =>
    let borderColor = selected ? "border-blue-300" : "border-white";
    <RowWrapper onDoubleClick={_ => setState(_ => Editing)} selected>
      <div className={"py-1 px-2 border " ++ borderColor}>
        {title |> ReasonReact.string}
      </div>
    </RowWrapper>;
  | Editing =>
    <RowWrapper selected> <RowInput title onEdit onBlur=onEdit /> </RowWrapper>
  };
};
