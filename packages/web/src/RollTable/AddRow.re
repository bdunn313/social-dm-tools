[@react.component]
let make = (~onCreate) => {
  <RowInput title="" onEdit=onCreate onBlur={_ => ()} />;
};
