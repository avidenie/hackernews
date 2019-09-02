const { GraphQLServer } = require('graphql-yoga')

const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a HackerNews clone`,
    feed: () => links,
    // eslint-disable-next-line no-unused-vars
    link: (parent, args) => links.find(link => link.id === args.id)
  },
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        url: args.url,
        description: args.description
      }
      links.push(link)
      return link
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
