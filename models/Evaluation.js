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
  removed: Boolean,
  notification_sent: Boolean,
  surveys_completed: {type: Number, default: 0 },
  surveys_total: Number,

  email: String,
  first_name: String,
  last_name: String,
  job_title: String,
  company: String,
  department: String,
  campaign: String,
  evaluee_id: String,

  intro_text: String,
  
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
