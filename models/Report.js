const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');


var m = moment().format('DD/MM/YY');

const reportSchema = new Schema({
  creation_date_ISO:  {type: Date, default: Date.now },
  creation_date:  {type: String, default: m },
  last_modified: Date,
  evaluation_id: String,
  deadline: Date,
  online: Boolean,

  email: String,
  first_name: String,
  last_name: String,
  job_title: String,
  company: String,
  department: String,
  campaign: String,
  evaluee_id: String,
  
  results: {
    type: Array, default: []
  },

  evaluers : [{
    email: String,
    first_name: String,
    last_name: String,
    job_title: String,
    company: String,
    department: String
  }],

  supervisor : {
    email: String,
    first_name: String,
    last_name: String,
    job_title: String,
    company: String,
    department: String
  }

});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
