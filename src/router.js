import { Router } from 'express';
import * as Questions from './controllers/question_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport'; // requireAuth

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to my quiz website!' });
});

// your routes will go here
router.route('/quizes/:subject')
  .get(Questions.getQuestions);

router.route('/quizes')
  .post(Questions.createQuestion);

router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);

router.get('/profile/:email', UserController.profile);

router.put('/user/:id/:subject', requireAuth, UserController.updateUserAnswers);

router.put('/points/:id', requireAuth, UserController.updateUserPoints);


export default router;
