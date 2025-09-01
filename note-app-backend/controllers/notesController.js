const { validationResult } = require('express-validator');
const Note = require('../models/Note');
const User = require('../models/User');

// @desc    Get all notes for a user
// @route   GET /api/notes
exports.getNotes = async (req, res) => {
    try {
        // Find notes belonging to the logged-in user, sort by most recent
        console.log("get notes funcation started")
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
        console.log(notes);
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a new note
// @route   POST /api/notes
exports.createNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    try {
        const newNote = new Note({
            title,
            description,
            user: req.user.id, // Associate note with logged-in user
        });

        const note = await newNote.save();
        res.status(201).json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
exports.deleteNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        // Make sure user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Note.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Note removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Note not found' });
        }
        res.status(500).send('Server Error');
    }
};
