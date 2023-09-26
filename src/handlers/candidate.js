/* eslint-disable no-case-declarations */
function startCandidateLogic (bot, ctx) {
  const candidate = {
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: ''
  }

  let isContinueListening = true

  function handleUserInput (ctx) {
    if (!isContinueListening) {
      return
    }

    const fieldKey = Object.keys(candidate).find((key) => !candidate[key])

    switch (fieldKey) {
      case 'name':
        candidate.name = ctx.message.text
        ctx.reply('Please enter your Email:')
        break
      case 'email':
        candidate.email = ctx.message.text
        ctx.reply('Please enter your Phone Number:')
        break
      case 'phone':
        candidate.phone = ctx.message.text
        ctx.reply('Please enter your Skills:')
        break
      case 'skills':
        candidate.skills = ctx.message.text
        ctx.reply('Please enter your Experience:')
        break
      case 'experience':
        candidate.experience = ctx.message.text
        // All fields are filled, display the candidate information summary
        const summary = `Candidate Information:\n\nName: ${candidate.name}\nEmail: ${candidate.email}\nPhone: ${candidate.phone}\nSkills: ${candidate.skills}\nExperience: ${candidate.experience}`
        ctx.reply(summary)
        // Set the flag to stop listening
        isContinueListening = false
        break
      default:
        ctx.reply('Please enter valid information.')
        break
    }
  }

  ctx.reply('Please enter your Name:')
  bot.on('text', handleUserInput)
}

module.exports = { startCandidateLogic }
