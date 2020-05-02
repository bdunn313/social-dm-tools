[@react.component]
let make = (~onDoubleClick=_ => (), ~onRemove, ~selected, ~children) => {
  let baseClasses = "ml-8 mr-2 py-2 px-1 flex flex-row justify-between border-b-2 border-gray-200";
  let className =
    selected ? baseClasses ++ " bg-blue-300 text-blue-700" : baseClasses;
  <li className onDoubleClick>
    children
    <Button onClick=onRemove> {"del" |> React.string} </Button>
  </li>;
};
