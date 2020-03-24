[@react.component]
let make = () =>
  <main className="container mx-auto max-w-xl my-8">
    <header>
      <h1 className="text-blue-700 text-4xl">
        {"Social DM Tools!" |> ReasonReact.string}
      </h1>
    </header>
    <RollTable />
  </main>;
