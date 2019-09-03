const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    info: () => `This is the API of a HackerNews clone`,
    // eslint-disable-next-line no-unused-vars
    feed: (root, args, context) => context.prisma.links(),
    // eslint-disable-next-line no-unused-vars
    link: (parent, args, context) => context.prisma.link({ id: args.id })
  },
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      })
    },
    // eslint-disable-next-line no-unused-vars
    update: (root, args, context) => {
      const newData = {}
      if (args.url) {
        newData.url = args.url
      }
      if (args.description) {
        newData.description = args.description
      }

      return context.prisma.updateLink({
        where: { id: args.id },
        data: newData
      })
    },
    // eslint-disable-next-line no-unused-vars
    delete: (parent, args, context) => {
      return context.prisma.deleteLink({ id: args.id })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma
  }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
