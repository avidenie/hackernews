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
    },
    // eslint-disable-next-line no-unused-vars
    update: (parent, args) => {
      let existingLink = links.find(link => link.id === args.id)
      if (existingLink) {
        if (args.url) {
          existingLink.url = args.url
        }
        if (args.description) {
          existingLink.description = args.description
        }
      }
      return existingLink
    },
    // eslint-disable-next-line no-unused-vars
    delete: (parent, args) => {
      let existingPosition = links.findIndex(link => link.id === args.id)
      if (existingPosition === -1) {
        return null
      }
      const deletedLink = links[existingPosition]
      delete links[existingPosition]
      return deletedLink
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
