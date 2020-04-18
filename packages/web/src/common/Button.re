[@react.component]
let make = (~onClick, ~children) => {
  <button
    className="rounded-sm px-3 text-gray-700 hover:text-gray-800 bg-gray-400 hover:bg-gray-500"
    onClick>
    children
  </button>;
};
