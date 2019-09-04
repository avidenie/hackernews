const Link = require('./resolvers/Link')
const Mutation = require('./resolvers/Mutation')
const Query = require('./resolvers/Query')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Vote = require('./resolvers/Vote')
const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
