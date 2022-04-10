const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		return JSON.parse(dataBuffer);
	} catch (e) {
		return [];
	}
};

const saveNotes = (notes) => {
	notesJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', notesJSON);
};

module.exports = {
	addNote(title, body) {
		const notes = loadNotes();

		// returns noteObj with same title
		const duplicateNote = notes.find((noteObj) => noteObj.title === title);

		if (!duplicateNote) {
			notes.push({
				title,
				body,
			});

			console.log(chalk.green.bold.inverse(`'${title}' added.\nSuccesfully!`));
		} else {
			console.log(
				chalk.red.bold.inverse(
					`'${title}' not added.\n${title}'s title alredy taken!!!`
				)
			);
		}

		saveNotes(notes);
	},

	removeNote(title) {
		const notes = loadNotes();

		if (notes.length > 0) {
			// return noteObjs except matched tittle
			const remainingNotes = notes.filter((noteObj) => noteObj.title !== title);

			if (remainingNotes.length === notes.length) {
				console.log(
					chalk.red.bold.inverse(
						`'${title}' not deleted.\nUnable to find the note.`
					)
				);
			} else {
				saveNotes(remainingNotes);

				console.log(
					chalk.red.bold.inverse(`'${title}' deleted.`),
					chalk.green.bold.inverse(`\nSuccesfully!`)
				);
			}
		} else {
			console.log(chalk.red.bold.inverse(`No notes are there!`));
		}
	},

	readNote(title) {
		const notes = loadNotes();

		const note = notes.find((note) => note.title === title);

		if (note) {
			console.log();
			console.log(chalk.bold.yellow(note.title));
			console.log();
			console.log(chalk.bold(note.body), '\n\n');
		} else {
			console.log(chalk.bold.red.inverse(`Unable to find the note!`));
		}
	},

	listNotes() {
		const notes = loadNotes();

		if (notes.length) {
			console.log(chalk.bold.greenBright('Your Notes:\n\n'));
			notes.forEach((note) => {
				console.log(chalk.bold.yellow(note.title));
				console.log();
				console.log(chalk.bold(note.body), '\n\n');
			});
		} else {
			console.log(chalk.bold.red.inverse('No notes are there!'));
		}
	},
};
