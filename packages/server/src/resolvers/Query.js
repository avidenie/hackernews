function info() {
  return `This is the API of a HackerNews clone`
}

function feed(root, args, context) {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    : {}
  return context.prisma.links({ where })
}

function link(parent, args, context) {
  return context.prisma.link({ id: args.id })
}

module.exports = {
  info,
  feed,
  link
}
