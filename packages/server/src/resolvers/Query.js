function info() {
  return `This is the API of a HackerNews clone`
}

async function feed(root, args, context) {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    : {}
  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  })
  const count = await context.prisma
    .linksConnection({ where })
    .aggregate()
    .count()
  return {
    links,
    count
  }
}

function link(parent, args, context) {
  return context.prisma.link({ id: args.id })
}

module.exports = {
  info,
  feed,
  link
}
