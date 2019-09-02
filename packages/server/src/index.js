const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  info: String!
}
`

const resolvers = {
  Query: {
    info: _ => `This is the API of a HackerNews clone`
  }
}
const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(_ => console.log(`Server is running on http://localhost:4000`))
