import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const QuestionSchema = new Schema({
  question: String,
  a: String,
  b: String,
  c: String,
  d: String,
  answer: String,
  subject: String,
  questionNo: Number,
});

// create PostModel class from schema
const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel;
//
