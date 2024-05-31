

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {

    // var targ; 
    var dragiable = document.getElementById(ev.dataTransfer.getData("text"));

    if (dragiable.classList.contains("task-block")) {
        
        //targ = dragiable.parentNode;
    }else{
        attachTask( dragiable, ev.target )
        
    }

   
        //ev.preventDefault();
      
}



var input = document.getElementById("forceTask");


input.addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
    
    event.preventDefault();
    
    createNewTask(input.value, true, 0)
    input.value = "";
  }
});






