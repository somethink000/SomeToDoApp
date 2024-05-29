function addTaskBox(taskbox, index) {

    let div = document.createElement('div');
    div.setAttribute('class', 'task-block bl-box main-border');
    div.setAttribute('ondrop', "drop(event)");
    div.setAttribute('ondragover', "allowDrop(event)");
    div.setAttribute('draggable', "true");
    div.setAttribute('ondragstart', "drag(event)");
    div.setAttribute('id', "taskbox"+index);
    div.innerHTML = `
        <div class="task-block-name">
            <p class="title">${taskbox.title}</p>
        </div>

        <div class="baseline"><div class="baseline_line"></div></div>
    `;
    

    tasks_place.append(div);
}