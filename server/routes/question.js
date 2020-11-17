import express from 'express';
import questioncontroller from '../controllers/questioncontroller.js';
import auth from '../middleware/auth.js';


const router = express.Router();
// view all question
router.get('/questions', auth, questioncontroller.findAll);

  // create one question

router.post('/question', auth, questioncontroller.postOne);
router.get('/question/:id',auth,questioncontroller.getOne);

// delete one
router.delete('/question/delete/:id', auth, questioncontroller.deleteOne);

export default router;