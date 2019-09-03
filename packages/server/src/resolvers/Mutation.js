const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

function post(parent, args, context) {
  const userId = getUserId(context)
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  })
}

async function updateLink(parent, args, context) {
  const ownerId = await context.prisma
    .link({ id: args.id })
    .postedBy()
    .id()
  const userId = getUserId(context)
  if (userId != ownerId) {
    throw new Error('Not authorized to update link')
  }

  const newData = {}
  if (args.url) {
    newData.url = args.url
  }
  if (args.description) {
    newData.description = args.description
  }

  return context.prisma.updateLink({
    where: {
      id: args.id
    },
    data: newData
  })
}

async function deleteLink(parent, args, context) {
  const ownerId = await context.prisma
    .link({ id: args.id })
    .postedBy()
    .id()
  const userId = getUserId(context)
  if (userId != ownerId) {
    throw new Error('Not authorized to delete link')
  }
  return context.prisma.deleteLink({ id: args.id })
}

async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({ ...args, password })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

async function login(parent, args, context) {
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

module.exports = {
  post,
  updateLink,
  deleteLink,
  signup,
  login
}
