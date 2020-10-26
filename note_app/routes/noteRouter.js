const router = require('express').Router();
const auth = require('../middleware/auth');
const noteController = require('../controllers/noteController');

router.route('/')
  .get(auth, noteController.getNotes)
  .post(auth, noteController.createNote)

router.route('/:id')
  .get(auth, noteController.getNote)
  .put(auth, noteController.updateNote)
  .delete(auth, noteController.deleteNote)
  // .get((req, res) => )


module.exports = router;