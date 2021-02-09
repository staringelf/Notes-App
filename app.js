const getNotes = require('./notes.js');
const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes.js');
const { demandOption } = require('yargs');

notes.getNotes();
//Customize Version
yargs.version('1.1.0');

//add
yargs.command ({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string' 
        },
        body: {
            describe: 'Note Text',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
    }
});

//remove
yargs.command ({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
});

//list
yargs.command ({
    command: 'list',
    describe: 'List the notes', 
    handler: function () {
        notes.listNotes();
    }
});

//read
yargs.command ({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title: {
            describe: 'Node Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.readNote(argv.title);
    }
});

yargs.parse();

// console.log(yargs.argv);