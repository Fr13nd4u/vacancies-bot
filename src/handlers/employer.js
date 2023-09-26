/* eslint-disable no-case-declarations */
function startEmployerLogic (bot, ctx) {
  ctx.reply('You selected "Create Vacancy". Let\'s start by entering the job details.')

  const vacancy = {
    city: '',
    position: '',
    salary: '',
    company: '',
    requirements: '',
    duties: '',
    contacts: ''
  }

  let isContinueListening = true

  function handleUserInput (ctx) {
    if (!isContinueListening) {
      return
    }

    const fieldKey = Object.keys(vacancy).find((key) => !vacancy[key])

    switch (fieldKey) {
      case 'city':
        vacancy.city = ctx.message.text
        ctx.reply('Please enter the Position:')
        break
      case 'position':
        vacancy.position = ctx.message.text
        ctx.reply('Please enter the Salary:')
        break
      case 'salary':
        vacancy.salary = ctx.message.text
        ctx.reply('Please enter the Company:')
        break
      case 'company':
        vacancy.company = ctx.message.text
        ctx.reply('Please enter the Requirements:')
        break
      case 'requirements':
        vacancy.requirements = ctx.message.text
        ctx.reply('Please enter the Duties:')
        break
      case 'duties':
        vacancy.duties = ctx.message.text
        ctx.reply('Please enter the Contacts:')
        break
      case 'contacts':
        vacancy.contacts = ctx.message.text
        // All fields are filled, display the job vacancy summary
        const summary = `Job Vacancy Summary:\n\nCity: ${vacancy.city}\nPosition: ${vacancy.position}\nSalary: ${vacancy.salary}\nCompany: ${vacancy.company}\nRequirements: ${vacancy.requirements}\nDuties: ${vacancy.duties}\nContacts: ${vacancy.contacts}`
        ctx.reply(summary)
        // Set the flag to stop listening
        isContinueListening = false
        break
      default:
        ctx.reply('Please enter valid information.')
        break
    }
  }

  ctx.reply('Please enter the City:')
  bot.on('text', handleUserInput)
}

module.exports = { startEmployerLogic }
