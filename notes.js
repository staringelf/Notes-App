const fs = require('fs');
const { stringify } = require('querystring');

function getNotes (a){
}

function addNote (title, body) {
    debugger;

    const notes = loadNotes();
    let note = null;
    if (note = notes.find(note => note.title === title)) {
        note.body = body;
    } else {
        notes.push({
            title: title,
            body: body
        });
    }
    saveNotes(notes);
}

function removeNote (title) {
    const notes = loadNotes();
    const noteIndex = notes.findIndex(note => note.title === title);
    notes.splice(noteIndex, 1);
    saveNotes(notes);
}

function listNotes () {
    const notes = loadNotes();
    const list = notes.map(note => `${note.title}` + '\n').join('');
    console.log('Your notes...');
    console.log(list);
    return list;
}

function saveNotes (notes) {
    fs.writeFileSync('./notes.json', JSON.stringify(notes));
}

function loadNotes () {
    try {
        const notes = fs.readFileSync('./notes.json'); 
        return JSON.parse(notes);
    } catch (err) {
        return [];
    }
}

function readNote (title) {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    console.log(`${note.title}` + ': \n' + `${note.body}`);
    return note;
}

// addNote('A', 'b');

module.exports = {
    getNotes, 
    addNote, 
    removeNote,
    listNotes,
    readNote
}