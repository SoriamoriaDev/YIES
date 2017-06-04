
var standard = [ "Effectiveness", "Organisational skills", "Work quality", "Punctuality", "Teamwork", "Communication - Oral", "Communication - Written", "English level", "Managerial potential",
    "Mentoring potential", "Interpersonal skills", "Willingness to learn", "Sharing knowledge", "Motivating others", "Thinking outside the box", "Adherence to company policy"];

function insertTemplate1(divName){ //Specific

        var newdiv = document.createElement('div');
        newdiv.setAttribute("id", "template_questions");
        var list = [];

        var x = standard; //Specific

        for( i=0 ;  i < x.length ; i++ ) {
            list +=
                "<div class='row' id='row" + (counter + 1) + "'>" +
                "<div class='col-md-2'><input type='text' class='index' name='index' readonly></div>" +
                "<div class='col-md-8'><input class='input-long' maxlength='30' type='text' name='question' value='"+x[i]+"' required></div>" +
                "<div class='col-md-2'><div align='center'><a class='action-icons'><i class='fa fa-trash-o fa-lg' id='delete' aria-hidden='true'></i></a></div></div>" +
                "</div>";
        }

        newdiv.innerHTML =
            "COMPETENCE OR KNOWLEDGE:" +
                "<div class='container-survey'>" +
                    "<div class='row-heading'>" +
                        "<div class='col-md-2'>NUMBER</div>" +
                        "<div class='col-md-8'>TEXT</div>" +
                        "<div class='col-md-2'><div align='center'>ACTION</div></div>" +
                    "</div>" +
                        list +
                "<div id='dynamicInput'></div>" +
                "</div>" +

                "<div align='center'><input type='button' id='add_one_line' class='add-evaluer' value='+ Add'></div>";

    document.getElementById(divName).replaceWith(newdiv);

}



var admin = [ "Word", "Excel", "Business Understanding", "Resource management", "Time management", "Planning and organising", "Customer attendance", "Effectiveness",
    "Work quality", "Punctuality", "Teamwork", "Flexibility to change", "Communication - Oral", "Communication - Written", "English level", "Managerial potential",
    "Mentoring potential", "Interpersonal skills", "Willingness to learn", "Sharing knowledge", "Motivating others",  "New office technologies"];

function insertTemplate2(divName){ //Specific

    var newdiv = document.createElement('div');
    newdiv.setAttribute("id", "template_questions");
    var list = [];

    var x = admin; //Specific

    for( i=0 ;  i < x.length ; i++ ) {
        list +=
            "<div class='row' id='row" + (counter + 1) + "'>" +
            "<div class='col-md-2'><input type='text' class='index' name='index' readonly></div>" +
            "<div class='col-md-8'><input class='input-long' maxlength='30' type='text' name='question' value='"+x[i]+"' required></div>" +
            "<div class='col-md-2'><div align='center'><a class='action-icons'><i class='fa fa-trash-o fa-lg' id='delete' aria-hidden='true'></i></a></div></div>" +
            "</div>";
    }

    newdiv.innerHTML =
        "COMPETENCE OR KNOWLEDGE:" +
        "<div class='container-survey'>" +
        "<div class='row-heading'>" +
        "<div class='col-md-2'>NUMBER</div>" +
        "<div class='col-md-8'>TEXT</div>" +
        "<div class='col-md-2'><div align='center'>ACTION</div></div>" +
        "</div>" +
        list +
        "<div id='dynamicInput'></div>" +
        "</div>" +

        "<div align='center'><input type='button' id='add_one_line' class='add-evaluer' value='+ Add'></div>";

    document.getElementById(divName).replaceWith(newdiv);

}



var developer = [ "Code readability", "Problem decomposition", "Source code version control", "Adherence to guidelines", "Java", "HTML", "CSS", "Javascript",
    "MongoDB", "Industry knowledge", "Curiosity", "Project management", "Effectiveness", "Organisational skills", "Work quality", "Punctuality", "Teamwork", "Communication - Oral",
    "Communication - Written", "English level", "Managerial potential", "Mentoring potential", "Interpersonal skills", "Willingness to learn",
    "Sharing knowledge", "Motivating others", "Thinking outside the box", "Adherence to company policy"];

function insertTemplate3(divName){ //Specific

    var newdiv = document.createElement('div');
    newdiv.setAttribute("id", "template_questions");
    var list = [];

    var x = developer; //Specific

    for( i=0 ;  i < x.length ; i++ ) {
        list +=
            "<div class='row' id='row" + (counter + 1) + "'>" +
            "<div class='col-md-2'><input type='text' class='index' name='index' readonly></div>" +
            "<div class='col-md-8'><input class='input-long' maxlength='30' type='text' name='question' value='"+x[i]+"' required></div>" +
            "<div class='col-md-2'><div align='center'><a class='action-icons'><i class='fa fa-trash-o fa-lg' id='delete' aria-hidden='true'></i></a></div></div>" +
            "</div>";
    }

    newdiv.innerHTML =
        "COMPETENCE OR KNOWLEDGE:" +
        "<div class='container-survey'>" +
        "<div class='row-heading'>" +
        "<div class='col-md-2'>NUMBER</div>" +
        "<div class='col-md-8'>TEXT</div>" +
        "<div class='col-md-2'><div align='center'>ACTION</div></div>" +
        "</div>" +
        list +
        "<div id='dynamicInput'></div>" +
        "</div>" +

        "<div align='center'><input type='button' id='add_one_line' class='add-evaluer' value='+ Add'></div>";

    document.getElementById(divName).replaceWith(newdiv);

}


var mechanical_engineer = [ "Design", "Calculations", "Industry knowledge", "Materials knowledge", "Analytical thinking", "AutoCAD", "IT skills ", "Mathematics", "Problem solving", "Project management",
    "Time and resource planning", "Effectiveness", "Organisational skills", "Work quality", "Punctuality", "Teamwork", "Communication - Oral", "Communication - Written", "English level",
    "Managerial potential", "Mentoring potential", "Interpersonal skills", "Willingness to learn", "Sharing knowledge", "Motivating others", "Thinking outside the box",
    "Adherence to company policy"];

function insertTemplate4(divName){ //Specific

    var newdiv = document.createElement('div');
    newdiv.setAttribute("id", "template_questions");
    var list = [];

    var x = mechanical_engineer; //Specific

    for( i=0 ;  i < x.length ; i++ ) {
        list +=
            "<div class='row' id='row" + (counter + 1) + "'>" +
            "<div class='col-md-2'><input type='text' class='index' name='index' readonly></div>" +
            "<div class='col-md-8'><input class='input-long' maxlength='30' type='text' name='question' value='"+x[i]+"' required></div>" +
            "<div class='col-md-2'><div align='center'><a class='action-icons'><i class='fa fa-trash-o fa-lg' id='delete' aria-hidden='true'></i></a></div></div>" +
            "</div>";
    }

    newdiv.innerHTML =
        "COMPETENCE OR KNOWLEDGE:" +
        "<div class='container-survey'>" +
        "<div class='row-heading'>" +
        "<div class='col-md-2'>NUMBER</div>" +
        "<div class='col-md-8'>TEXT</div>" +
        "<div class='col-md-2'><div align='center'>ACTION</div></div>" +
        "</div>" +
        list +
        "<div id='dynamicInput'></div>" +
        "</div>" +

        "<div align='center'><input type='button' id='add_one_line' class='add-evaluer' value='+ Add'></div>";

    document.getElementById(divName).replaceWith(newdiv);

}

var installation_engineer = [ 'Procedure development', 'Calculation', 'Risk management', 'Subcontractor management', 'Client interaction', 'Thinking outside the box',
    'Following procedures', 'Adherence to company policy', 'Schedule management', 'Budget management', 'Industry knowledge', 'Product knowledge', 'Punctuality',
    'Organisational skills', 'Attention to detail', 'Teamwork', 'Self-motivation', 'Motivating others', 'Managerial potential', 'Mentoring potential', 'Effectiveness',
    'Work quality', 'Communication skills - oral', 'Communication skills - written', 'English level', 'Interpersonal skills', 'Openess', 'Willingness to learn',
    'Commitment to work', 'Sharing knowledge'];

function insertTemplate5(divName){ //Specific

    var newdiv = document.createElement('div');
    newdiv.setAttribute("id", "template_questions");
    var list = [];

    var x = installation_engineer; //Specific

    for( i=0 ;  i < x.length ; i++ ) {
        list +=
            "<div class='row' id='row" + (counter + 1) + "'>" +
            "<div class='col-md-2'><input type='text' class='index' name='index' readonly></div>" +
            "<div class='col-md-8'><input class='input-long' maxlength='30' type='text' name='question' value='"+x[i]+"' required></div>" +
            "<div class='col-md-2'><div align='center'><a class='action-icons'><i class='fa fa-trash-o fa-lg' id='delete' aria-hidden='true'></i></a></div></div>" +
            "</div>";
    }

    newdiv.innerHTML =
        "COMPETENCE OR KNOWLEDGE:" +
        "<div class='container-survey'>" +
        "<div class='row-heading'>" +
        "<div class='col-md-2'>NUMBER</div>" +
        "<div class='col-md-8'>TEXT</div>" +
        "<div class='col-md-2'><div align='center'>ACTION</div></div>" +
        "</div>" +
        list +
        "<div id='dynamicInput'></div>" +
        "</div>" +

        "<div align='center'><input type='button' id='add_one_line' class='add-evaluer' value='+ Add'></div>";

    document.getElementById(divName).replaceWith(newdiv);

}


var department_manager = ['Team management', 'Leadership', 'Presentation skills', 'Communication skills - oral', 'Communication skills - written', 'Interpersonal skills', "Delegation",
    'Empowering team members', 'Inspiring others', 'Process improvements', 'Conflict resolution', 'Industry knowledge', 'Organisational skills',
    'Teamwork', 'Self-motivation', 'Motivating others', 'Effectiveness', 'Work quality', 'English level','Openness', 'Willingness to learn','Commitment to work',
    'Adherence to company policy'];

function insertTemplate6(divName){ //Specific

    var newdiv = document.createElement('div');
    newdiv.setAttribute("id", "template_questions");
    var list = [];

    var x = department_manager; //Specific

    for( i=0 ;  i < x.length ; i++ ) {
        list +=
            "<div class='row' id='row" + (counter + 1) + "'>" +
            "<div class='col-md-2'><input type='text' class='index' name='index' readonly></div>" +
            "<div class='col-md-8'><input class='input-long' maxlength='30' type='text' name='question' value='"+x[i]+"' required></div>" +
            "<div class='col-md-2'><div align='center'><a class='action-icons'><i class='fa fa-trash-o fa-lg' id='delete' aria-hidden='true'></i></a></div></div>" +
            "</div>";
    }

    newdiv.innerHTML =
        "COMPETENCE OR KNOWLEDGE:" +
        "<div class='container-survey'>" +
        "<div class='row-heading'>" +
        "<div class='col-md-2'>NUMBER</div>" +
        "<div class='col-md-8'>TEXT</div>" +
        "<div class='col-md-2'><div align='center'>ACTION</div></div>" +
        "</div>" +
        list +
        "<div id='dynamicInput'></div>" +
        "</div>" +

        "<div align='center'><input type='button' id='add_one_line' class='add-evaluer' value='+ Add'></div>";

    document.getElementById(divName).replaceWith(newdiv);

}





var president = ['Vision', 'Leadership', 'Negotiation skills', 'Geopolitics', 'Public affairs', 'Public administration', 'Civil law', 'Constitution',
    'International conflicts', 'Taxation', 'Follow protocol', 'Politics', 'Constitution', 'Conflict resolution', 'Organisational skills', 'Teamwork',
    'Self-motivation', 'Motivating others', 'Effectiveness', 'Work quality', 'Communication skills - oral', 'Communication skills - written',
    'Interpersonal skills', 'English level','Openness', 'Willingness to learn','Commitment to work','Adherence to company policy','Inspiring others'];

function insertTemplate7(divName){ //Specific

    var newdiv = document.createElement('div');
    newdiv.setAttribute("id", "template_questions");
    var list = [];

    var x = president; //Specific

    for( i=0 ;  i < x.length ; i++ ) {
        list +=
            "<div class='row' id='row" + (counter + 1) + "'>" +
            "<div class='col-md-2'><input type='text' class='index' name='index' readonly></div>" +
            "<div class='col-md-8'><input class='input-long' maxlength='30' type='text' name='question' value='"+x[i]+"' required></div>" +
            "<div class='col-md-2'><div align='center'><a class='action-icons'><i class='fa fa-trash-o fa-lg' id='delete' aria-hidden='true'></i></a></div></div>" +
            "</div>";
    }

    newdiv.innerHTML =
        "COMPETENCE OR KNOWLEDGE:" +
        "<div class='container-survey'>" +
        "<div class='row-heading'>" +
        "<div class='col-md-2'>NUMBER</div>" +
        "<div class='col-md-8'>TEXT</div>" +
        "<div class='col-md-2'><div align='center'>ACTION</div></div>" +
        "</div>" +
        list +
        "<div id='dynamicInput'></div>" +
        "</div>" +

        "<div align='center'><input type='button' id='add_one_line' class='add-evaluer' value='+ Add'></div>";

    document.getElementById(divName).replaceWith(newdiv);

}

var manager = ['Vision', 'Leadership', 'Strategical thinking', 'Communication skills - oral', 'Communication skills - written', 'Presentation skills', "Delegation",
    'Empowering team members', 'Inspiring others', 'Negotiation skills', 'Resource management', 'Willingness for success', 'Natural charisma',
    'Conflict resolution', 'Industry knowledge', 'Organisational skills', 'Teamwork', 'Self-motivation', 'Motivating others', 'Effectiveness', 'Work quality',
    'Interpersonal skills', 'English level','Openness', 'Willingness to learn','Commitment to work','Adherence to company policy'];

function insertTemplate8(divName){ //Specific

    var newdiv = document.createElement('div');
    newdiv.setAttribute("id", "template_questions");
    var list = [];

    var x = manager; //Specific

    for( i=0 ;  i < x.length ; i++ ) {
        list +=
            "<div class='row' id='row" + (counter + 1) + "'>" +
            "<div class='col-md-2'><input type='text' class='index' name='index' readonly></div>" +
            "<div class='col-md-8'><input class='input-long' maxlength='30' type='text' name='question' value='"+x[i]+"' required></div>" +
            "<div class='col-md-2'><div align='center'><a class='action-icons'><i class='fa fa-trash-o fa-lg' id='delete' aria-hidden='true'></i></a></div></div>" +
            "</div>";
    }

    newdiv.innerHTML =
        "COMPETENCE OR KNOWLEDGE:" +
        "<div class='container-survey'>" +
        "<div class='row-heading'>" +
        "<div class='col-md-2'>NUMBER</div>" +
        "<div class='col-md-8'>TEXT</div>" +
        "<div class='col-md-2'><div align='center'>ACTION</div></div>" +
        "</div>" +
        list +
        "<div id='dynamicInput'></div>" +
        "</div>" +

        "<div align='center'><input type='button' id='add_one_line' class='add-evaluer' value='+ Add'></div>";

    document.getElementById(divName).replaceWith(newdiv);

}

var brand_manager = ['Time and resource management', 'Budget management (ATL - BTL)', 'Portfolio management', 'Market analysis', 'Consumer insight', 'Marketing expertise', 'Creativity & innovation', 'Brand understanding', 'Strategic thinking',
    'Leadership', 'Analytical skills', 'Presentation skills', 'Communication strategy', 'Communication skills - oral', 'Communication skills - written', 'Interpersonal skills',
    "Critical thinking", 'IT prowess', 'Industry knowledge', 'Organisational skills', 'Teamwork', 'Self-motivation', 'Motivating others', 'Effectiveness', 'Work quality',
    'English level', 'Openness', 'Willingness to learn', 'Commitment to work', 'Adherence to company policy'];

function insertTemplate9(divName){ //Specific

    var newdiv = document.createElement('div');
    newdiv.setAttribute("id", "template_questions");
    var list = [];

    var x = brand_manager; //Specific

    for( i=0 ;  i < x.length ; i++ ) {
        list +=
            "<div class='row' id='row" + (counter + 1) + "'>" +
            "<div class='col-md-2'><input type='text' class='index' name='index' readonly></div>" +
            "<div class='col-md-8'><input class='input-long' maxlength='30' type='text' name='question' value='"+x[i]+"' required></div>" +
            "<div class='col-md-2'><div align='center'><a class='action-icons'><i class='fa fa-trash-o fa-lg' id='delete' aria-hidden='true'></i></a></div></div>" +
            "</div>";
    }

    newdiv.innerHTML =
        "COMPETENCE OR KNOWLEDGE:" +
        "<div class='container-survey'>" +
        "<div class='row-heading'>" +
        "<div class='col-md-2'>NUMBER</div>" +
        "<div class='col-md-8'>TEXT</div>" +
        "<div class='col-md-2'><div align='center'>ACTION</div></div>" +
        "</div>" +
        list +
        "<div id='dynamicInput'></div>" +
        "</div>" +

        "<div align='center'><input type='button' id='add_one_line' class='add-evaluer' value='+ Add'></div>";

    document.getElementById(divName).replaceWith(newdiv);

}