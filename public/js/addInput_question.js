


var counter = 16;
var limit = 30;


function addInput(divName){
    if (counter == limit)  {
        alert("You have reached the limit of adding " + counter + " questions");
    }
    else {
        var newdiv = document.createElement('div');
        var id_name = "#"+(counter+1);
        newdiv.innerHTML =

    "<div class='row' id='row"+(counter+1)+"'>" +
            "<div class='col-md-2'><input type='text' name='index' id='index' value='"+(counter+1)+"'></div>" +
            "<div class='col-md-8'><input class='input-long' type='text' name='question' value='' placeholder='Add new competence here' required></div>" +
            "<div class='col-md-2'><div id='remove' align='center'><a class='action-icons'><i class='fa fa-trash-o fa-lg' id='delete' aria-hidden='true'></i></a></div></div>" +
            "</div>";
    }

        
        document.getElementById(divName).appendChild(newdiv);
        counter++;
        document.getElementById("number_questions").value = counter;

}




