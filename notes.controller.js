const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)

  await saveNotes(notes)
  console.log(chalk.green('Note was added!'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.green('Here is the list of notes:'))
  notes.forEach(note => {
    console.log(chalk.blue(note.id), chalk.blue(note.title))
  })
}

async function removeNote(id) {
  const notes = await getNotes()

  const filtered = notes.filter(note => note.id !== id)

  await saveNotes(filtered)
  console.log(chalk.red(`Note with id="${id}" has been removed.`))
}

async function editNote(id, title) {
  const notes = await getNotes()

  const newNote = notes.find(note => note.id === id)
  newNote.title = title

  await saveNotes(notes)
  console.log(chalk.green(`Title for note with id=${id} has been change`))
}

module.exports = {
  addNote, printNotes, removeNote, editNote
}