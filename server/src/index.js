const data = require("./fixtures/roles.json");
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  "A date/time"
  scalar DateTime

  type Query {
    "The roles"
    roles: [Role!]
  }

  type Role {
    title: String!,
    employers: [Employer!]!,
  }

  type Employer {
    name: String!,
    startDate: DateTime!,
    endDate: DateTime,
    accomplishments: [String!],
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    roles: (obj, args, context) => {
      return context.roles;
    }
  },
};

const context = {
  roles: data.roles,
}

const server = new ApolloServer({ context, typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);