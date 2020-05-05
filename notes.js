const fs = require("fs");
const chalk = require('chalk')


const addNote =  (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => note.title === title)
  const duplicateNote = notes.find((note) => note.title ===title)

  debugger
  

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New Note added'));
  }
  else{
    console.log(chalk.red.inverse('Note title already taken'));  
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const uniqueNotes = notes.filter((note) => note.title!==title)

  // const uniqueNotes = notes.filter(function (note) {
  //   return note.title !== title;
  // })


  if(uniqueNotes.length<notes.length){
    saveNotes(uniqueNotes)
    console.log(chalk.green.inverse('Note removed!'))
  }
  else{
    console.log(chalk.red.inverse('No note found!')) 
    
  }
  
}


const listNotes = () => {
  const notes = loadNotes()
  
  console.log(chalk.greenBright.inverse('Your notes'))

  notes.forEach((note) => {
    console.log(note.title)
  })
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};


const readNote = (title) => {
  const notes = loadNotes()
  const noteToRead = notes.find((note) => note.title === title)
  if(noteToRead)
  {
    console.log(chalk.inverse(noteToRead.title))
    console.log(noteToRead.body)
  }
  else{
    console.log(chalk.red.inverse('Note not found'))
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
