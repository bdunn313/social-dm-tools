module BookQuery = [%graphql
  {|
  query MyQuery {
    books {
      title
    }
  }
|}
];

module GetBookQuery = ReasonApollo.CreateQuery(BookQuery);

[@react.component]
let make = () => {
  let query = BookQuery.make();
  <main className="container mx-auto max-w-xl my-8">
    <header className="pb-1 px-3">
      <h1 className="text-blue-700 text-4xl">
        {"Social DM Tools!" |> ReasonReact.string}
      </h1>
    </header>
    <div>
      <RollTable />
      <GetBookQuery variables=query##variables>
        ...{({result}) =>
          switch (result) {
          | Loading => <div> {"Loading" |> ReasonReact.string} </div>
          | Error(error) => <div> {error.message |> ReasonReact.string} </div>
          | Data(data) =>
            switch (data##books) {
            | None => <div> {"No books found" |> ReasonReact.string} </div>
            | Some(books) =>
              <>
                {books->Belt.Array.map(book =>
                  <div>
                    {book->Belt.Option.mapWithDefault("", b =>
                      b##title->Belt.Option.mapWithDefault("", title => title)
                    )
                    |> ReasonReact.string}
                  </div>
                )
                |> React.array}
              </>
            }
          }
        }
      </GetBookQuery>
    </div>
  </main>;
};
