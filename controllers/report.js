const Survey = require('../models/Survey');


/**
 * GET /
 * Report.
 */



exports.getReport = (req, res, next) => {
    var id = req.query.evaluation_id;
    console.log(id);
    Survey.find({'evaluation_id': id}, function (err, doc) {
    if (err) {
        console.log('error, no entry found');
    }
    console.log(doc);
    var competences = doc[0].questions;

    var report1 = []; //Competences + all scores
    var report2 = []; //Competences + averages + #ratings
    var information = []; //Info


    var first_name =  doc[0].first_name;
    var last_name =  doc[0].last_name;
    var job_title =  doc[0].job_title;
    var company =  doc[0].company;
    var department =  doc[0].department;
    var campaign =  doc[0].campaign;
    information.push(["info"]);
    information[0].push(first_name);
    information[0].push(last_name);
    information[0].push(job_title);
    information[0].push(company);
    information[0].push(department);
    information[0].push(campaign);


        /*** POPULATE REPORTS WITH COMPETENCES */
    competences.forEach( function (name){
        report1.push([name]);
        });
    competences.forEach( function (name){
        report2.push([name]);
    });

        /*** POPULATE REPORTS WITH SCORES FROM EACH SURVEY */
        for (i=0; i < doc.length; i++) {
            var y = doc[i];
            for (z=0; z < competences.length; z++) {
                report1[z].push(y.scores[z]);
        }}
        

        /*** CALCULATING AVERAGES AND #RATINGS */
    for(i=0; i < competences.length; i++){
        var element = report1[i];
        element.shift();
        var temp = element.map(function(i){
            return parseInt(i, 10);
        });
        var element2 = temp.filter(function(n){ return n > 0 });
        var x = element2.length;
        var sum = element2.reduce(function(a, b) { return a + b; }, 0);
        var average = sum/x;
        var level = average * 10;
        report2[i].push(level.toFixed(0));
        report2[i].push(average.toFixed(1));
        report2[i].push(x);
    }

    console.log("INFO file:"+ information);
    console.log(report2);

        /*** SORTING 3 BEST AND 3 WORSE RATINGS */

    var report3 = report2.slice(0);
        console.log("Report after slice: " + report3);

        // FILTER OUT ENTRIES WITH NaN
        var report3 = report3.filter(function(item) {
            return item[1] !== "NaN";});
        console.log("No more entries with NaN: " + report3);

        // SORT BEST TO WORSE
    report3.sort(function(a, b) {
        return a[1] < b[1] ? 1 : -1;
    });

    console.log("Sorted by strongest: " + report3);

        // PUSH 3 BEST IN NEW ARRAY
    var strength = [];
    strength.push(report3[0]);
    strength.push(report3[1]);
    strength.push(report3[2]);
    console.log(strength);

        // SORT WORSE TO BEST
    report3.sort(function(a, b) {
        return a[1] > b[1] ? 1 : -1;
    });

    console.log("Sorted by weakest: " + report3);

        // PUSH 3 WORSE IN NEW ARRAY
    var weakness = [];
    weakness.push(report3[0]);
    weakness.push(report3[1]);
    weakness.push(report3[2]);
    console.log(weakness);

    res.render('report', {title: 'Report', items: report2, info: information, strong: strength, weak: weakness});
});
};
