const { adminId } = require('../../config/config')

const userMessages = {}

function startAdminLogic (bot, ctx) {
  const userId = ctx.from.id
  const adminUserId = adminId

  // eslint-disable-next-line eqeqeq
  if (userId == adminUserId) {
    ctx.reply('You are the admin.')
  } else {
    forwardUserMessageToAdmin(bot, ctx, adminId)
  }
}

async function forwardUserMessageToAdmin (bot, ctx, adminUserId) {
  const userId = ctx.from.id
  const userKey = `user_${userId}` // Unique key for each user

  // Prompt the user to write their message to the admin
  await ctx.reply('Write your message to the admin:')

  // Listen for the user's response
  bot.on('text', async (ctx) => {
    if (ctx.from.id === userId) {
      const userMessage = ctx.message.text
      const userNickname = ctx.from.username

      // Store the user's message
      userMessages[userKey] = userMessages[userKey] || []
      userMessages[userKey].push(userMessage)

      try {
        // Forward the user's message to the admin, including the user's nickname
        await bot.telegram.sendMessage(
          adminUserId,
          `User message (from @${userNickname}):\n${userMessage}`
        )

        // Provide a confirmation to the user
        await ctx.reply('Your message has been sent to the admin.')
      } catch (error) {
        console.error(error)
        await ctx.reply('An error occurred while forwarding your message to the admin.')
      }
    }
  })
}

module.exports = { startAdminLogic }
