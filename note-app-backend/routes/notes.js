const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

const {
    getNotes,
    createNote,
    deleteNote
} = require('../controllers/notesController');


// All these routes are protected, so we apply the auth middleware
router.use(authMiddleware);

// @route   GET api/notes
// @desc    Get all user's notes
// @access  Private
router.get('/', getNotes);

// @route   POST api/notes
// @desc    Create a new note
// @access  Private
router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], createNote);


// @route   DELETE api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', deleteNote);

module.exports = router;

