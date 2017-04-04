const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');


var m = moment().format('DD/MM/YY');

const evaluationSchema = new Schema({
  creation_date_ISO:  {type: Date, default: Date.now },
  creation_date:  {type: String, default: m },
  last_modified: Date,
  status: String,
  deadline: Date,

  email: String,
  first_name: String,
  last_name: String,
  job_title: String,
  company: String,
  department: String,
  campaign: String,
  evaluee_id: String,

  intro_text: String,

  default_questions: {
    type: Array, default: ["Effectiveness", "Organisational skills", "Work quality", "Punctuality", "Teamwork",
      "Communication - Verbal", "Communication - Written", "English level", "Managerial potential", "Mentoring potential",
      "Interpersonal skills", "Willingness to learn", "Sharing knowledge", "Motivating others", "Thinking outside the box",
      "Adherence to company policy" ]
  },
  
  questions:{
    type: Array, default:[]
  },

  evaluers : [{
    email: String,
    first_name: String,
    last_name: String,
    job_title: String,
    company: String,
    department: String
  }],

  supervisor : [{
    email: String,
    first_name: String,
    last_name: String,
    job_title: String,
    company: String,
    department: String
  }]

});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;
