var counter = 2;
var limit = 25;
function addInput(divName){
    if (counter == limit)  {
        alert("You have reached the limit of adding " + counter + " inputs");
    }
    else {
        var newdiv = document.createElement('div');

        newdiv.innerHTML =
            "<div class='row'><div class='col-md-1'><input class='input-short' type='text' name='number' value='"+(counter)+"' readonly></div>" +
       "<div class='col-md-1'><input class='input-short' type='text' name='email' placeholder='Email'></div>" +
    "<div class='col-md-2'><input class='input-medium' type='text' name='first_name' placeholder='First Name'></div>" +
            "<div class='col-md-2'><input class='input-medium' type='text' name='last_name' placeholder='Last Name'></div>" +
            "<div class='col-md-2'><input class='input-medium' type='text' name='job_title' placeholder='Job Title'></div>" +
            "<div class='col-md-2'><input class='input-medium' type='text' name='company' placeholder='Company'></div>" +
            "<div class='col-md-2'><input class='input-medium' type='text' name='department' placeholder='Department'></div>" +
            "</div>";
        
        document.getElementById(divName).appendChild(newdiv);
        counter++;
        document.getElementById("number_evaluers").value = (counter-1);

    }

}

/*

*/
