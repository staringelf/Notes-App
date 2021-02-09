const fs = require('fs');
const chalk = require('chalk');

//Where did it come from
const { stringify } = require('querystring');

function addNote (title, body) {
    const notes = getNotes();
    let note = null;
    //updates the note
    if (note = notes.find(note => note.title === title)) {
        note.body = body;
        console.log(chalk.green.inverse('updated the node..'));
    } else {
        notes.push({
            title: title,
            body: body
        });
        console.log(chalk.green.inverse('added the node..'));
    }
    saveNotes(notes);
    console.log(chalk.green(title));
}

function removeNote (title) {
    const notes = getNotes();
    const noteIndex = notes.findIndex(note => note.title === title);
    if (noteIndex === -1){
        
        console.log(chalk.red.inverse(`Sorry! The note "${title}"  does not exist..`));
        return;
    }
    notes.splice(noteIndex, 1);
    saveNotes(notes);
    console.log(chalk.blue.inverse(`removed the node : ${title}`));
}

function listNotes () {
    const notes = getNotes();
    const list = notes.map(note => `${note.title}` + '\n').join('');
    console.log(chalk.bold.green('Your notes...'));
    console.log(list);
    return list;
}

function saveNotes (notes) {
    fs.writeFileSync('./notes.json', JSON.stringify(notes));
}

function getNotes () {
    try {
        const notes = fs.readFileSync('./notes.json'); 
        return JSON.parse(notes);
    } catch (err) {
        return [];
    }
}

function readNote (title) {
    const notes = getNotes();
    const note = notes.find(note => note.title === title);
    console.log(`${note.title}` + ': \n' + `${note.body}`);
    return note;
}

module.exports = {
    addNote, 
    removeNote,
    listNotes,
    readNote
}