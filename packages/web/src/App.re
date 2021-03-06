module ListQuery = [%graphql
  {|
  query AllRngListsQuery {
    lists {
      id
      title
      items {
        id
        title
      }
    }
  }
|}
];

module ListUpdated = [%graphql
  {|
  subscription ListUpdatedSubscription {
    listUpdated {
      id
      title
      items {
        id
        title
      }
    }
  }
|}
];

[@react.component]
let make = () => {
  let (lists, _full) = ApolloHooks.useQuery(ListQuery.definition);
  let (_listUpdatedSubscription, _full) =
    ApolloHooks.useSubscription(ListUpdated.definition);

  <main className="container mx-auto max-w-xl my-8">
    <header className="pb-1 px-3">
      <h1 className="text-blue-700 text-4xl">
        {"Social DM Tools!" |> ReasonReact.string}
      </h1>
    </header>
    <div>
      {switch (lists) {
       | Loading => <div> {"Loading" |> ReasonReact.string} </div>
       | Error(error) =>
         Js.log(error);
         "Something went wrong" |> ReasonReact.string;
       | Data(data) =>
         data##lists
         ->Belt.Array.map(list =>
             switch (list) {
             | None => React.null
             | Some(vals) =>
               let id = vals##id;
               let items = vals##items;
               let title = vals##title;
               let key = {j|rolltable-$id-$title|j};
               <RollTable key id title items />;
             }
           )
         |> React.array
       | NoData => "Something really went wrong here!" |> ReasonReact.string
       }}
    </div>
  </main>;
};
