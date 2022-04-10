const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

const argv = yargs.argv;

yargs.command({
	command: 'add',
	describe: 'Adds a file',
	builder: {
		title: {
			describe: 'Title of the file',
			demandOption: true,
			type: 'string',
		},
		body: {
			describe: 'Body of the file',
			demandOption: true,
			type: 'string',
		},
	},
	handler(arg) {
		notes.addNote(arg.title, arg.body);
	},
});

yargs.command({
	command: 'remove',
	describe: 'Removes a file',
	builder: {
		title: {
			describe: 'Title of the file',
			demandOption: true,
			type: 'string',
		},
	},
	handler(arg) {
		notes.removeNote(arg.title);
	},
});

yargs.command({
	command: 'read',
	describe: 'Reafs a file',
	builder: {
		title: {
			describe: 'Title of the file',
			demandOption: true,
			type: 'string',
		},
	},
	handler(arg) {
		notes.readNote(arg.title);
	},
});

yargs.command({
	command: 'list',
	describe: 'Lists the Notes',
	handler() {
		notes.listNotes();
	},
});

yargs.parse();
