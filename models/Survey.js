const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');


var m = moment().format('DD/MM/YY');

const surveySchema = new Schema({
  creation_date_ISO:  {type: Date, default: Date.now },
  creation_date:  {type: String, default: m },
  last_modified: Date,
  open: Boolean,
  permalink: String,
  evaluation_id: String,
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

  evaluer : {
    email: String,
    first_name: String,
    last_name: String,
    job_title: String,
    company: String,
    department: String
  },

  questions: {
    type: Array, default: [ ]
  },

  scores: {
    type: Array, default: [], Number
  },

  evaluer_comment : String

});






const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
