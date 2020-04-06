const { ApolloServer, gql, PubSub } = require("apollo-server");
const pubsub = new PubSub();
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type RngListItem {
    id: ID!
    title: String!
  }

  type RngList {
    id: ID!
    title: String!
    items: [RngListItem]!
  }

  type Subscription {
    itemAdded: RngList
  }

  type Query {
    lists: [RngList]!
  }

  type Mutation {
    addItem(id: ID!, title: String!): RngList!
    updateItem(id: ID!, title: String!): RngListItem!
    removeItem(id: ID!): RngList!
  }
`;

let lists = [
  {
    id: "LIST_0",
    title: "What book should I read?",
    items: [
      { id: "LIST_0_ITEM_0", title: "Harry Potter and the Chamber of Secrets" },
      { id: "LIST_0_ITEM_1", title: "Jurassic Park" },
    ],
  },
  {
    id: "LIST_1",
    title: "What lurks behind the next corner",
    items: [
      { id: "LIST_1_ITEM_0", title: "A gold dragon" },
      { id: "LIST_1_ITEM_1", title: "a kobold" },
      { id: "LIST_1_ITEM_2", title: "a friendly merchant" },
      { id: "LIST_1_ITEM_3", title: "a band of thieves" },
    ],
  },
];

const ITEM_ADDED = "ITEM_ADDED";

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    lists: () => lists,
  },
  Mutation: {
    addItem: async (_parent, args, _context, _info) => {
      lists = lists.map((x) => {
        if (x.id === args.id) {
          const newItems = [
            ...x.items,
            { id: `${x.id}_ITEM_${x.items.length}`, title: args.title },
          ];
          return { ...x, items: newItems };
        }
        return x;
      });
      const newList = lists.find((x) => x.id === args.id);
      await pubsub.publish(ITEM_ADDED, { itemAdded: newList });
      return { ...newList };
    },
    updateItem: (_parent, args, _context, _info) => {
      let subjectItem = null;
      lists = lists.map((x) => {
        const newItems = x.items.map((item) => {
          if (item.id === args.id) {
            subjectItem = { ...item, title: args.title };
            return subjectItem;
          }
          return item;
        });
        return { ...x, items: newItems };
      });
      return subjectItem;
    },
    removeItem: (_parent, args, _context, _info) => {
      let targetlist = null;
      lists = lists.map((x) => {
        const newList = {
          ...x,
          items: x.items.filter((y) => y.id !== args.id),
        };
        if (newList.items.length < x.items.length) {
          targetlist = newList;
        }
        return newList;
      });
      return targetlist;
    },
  },
  Subscription: {
    itemAdded: {
      subscribe: () => pubsub.asyncIterator([ITEM_ADDED]),
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// The `listen` method launches a web server.
server.listen({ port: 9999 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
