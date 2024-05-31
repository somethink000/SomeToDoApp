

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



function createTaskBoxWindow(event) {
    // const tasks_place = document.getElementById('tasks_place')

    let div = document.createElement('div');
    div.setAttribute('class', 'createTaskbox');
    div.innerHTML = `
        <div class="createBox bl-box main-border">

            <img class="circle_image_button" src="./assets/cross.png" width="32" onclick="closeCreateTaskBox(event)"/>
            
            <p class="title">Create new taskbox</p>

            <div class="task_form main-border">
                <input class="task_input" type="text" id="newTaskBoxInput"  placeholder="New taskBox">
            </div>

            <button class="add_button bl-box main-border" onclick="createTaskBox(event)">
              <p class="txt">Create</p>
            </button>

        </div>
    `;
    document.getElementById('body').append(div);
    
}

function closeCreateTaskBox(event) {
    
    event.target.closest(".createTaskbox").remove();

}




