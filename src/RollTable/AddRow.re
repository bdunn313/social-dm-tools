[@react.component]
let make = (~onCreate) => {
  <EditableRow.RowInput title="" onEdit=onCreate onBlur={_ => ()} />;
};
