import Question from '../models/question_model';

export const getQuestions = (req, res) => {
  Question.find({ subject: req.params.subject }, (err, questions) => {
    console.log(`get request recived sending ${req.params.subject}`);
    console.log(questions);
    res.send(questions);
  })
    .catch((error) => {
      res.json({ error });
    });
};

// TODO: remember to comment this out
export const getQuestion = (req, res) => {
  Question.findById(req.params.id).then((question) => {
    res.json({
      question: question.question,
      a: question.a,
      b: question.b,
      c: question.c,
      d: question.d,
      answer: question.answer,
    });
  })
    .catch((error) => {
      res.json({ error });
    });
};

// TODO: DEV MODE ONLY: used to test question api.
// In the future, consider adding a front end where one can
// post a question to the database.
// Sample command for pinging api:
// $ curl -X POST -H "Content-Type: application/json" -d '{
// "question": "question"
// }' "http://localhost:9090/api/quizes"
export const createQuestion = (req, res) => {
  console.log('creating');
  const question = new Question();
  question.question = req.body.question;

  question.save()
    .then((result) => {
      console.log(result);
      res.json({ message: 'Question created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
