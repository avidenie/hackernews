function info() {
  return `This is the API of a HackerNews clone`
}

function feed(root, args, context) {
  return context.prisma.links()
}

function link(parent, args, context) {
  return context.prisma.link({ id: args.id })
}

module.exports = {
  info,
  feed,
  link
}
