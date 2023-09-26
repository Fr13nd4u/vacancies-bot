const { Telegraf, Markup } = require('telegraf')
const config = require('../config/config')
const { Admin, Candidate, Employer } = require('./constants')
const { startAdminLogic } = require('./handlers/admin')
const { startCandidateLogic } = require('./handlers/candidate')
const { startEmployerLogic } = require('./handlers/employer')

function mainMenuKeyboard () {
  return Markup.keyboard([
    [Employer.btn, Candidate.btn],
    [Admin.btn]
  ]).resize()
}

function startBot () {
  const bot = new Telegraf(config.telegramToken)

  // Start command handler
  bot.start((ctx) => {
    console.log('user id: ', ctx.from.id)
    ctx.reply('Welcome to the main menu!', mainMenuKeyboard())
  })

  // Handle button clicks
  bot.hears(Employer.btn, (ctx) => {
    startEmployerLogic(bot, ctx)
  })

  bot.hears(Candidate.btn, (ctx) => {
    startCandidateLogic(bot, ctx)
  })

  bot.hears(Admin.btn, (ctx) => {
    startAdminLogic(bot, ctx)
  })

  // Launch the bot
  bot.launch()
}

startBot()
