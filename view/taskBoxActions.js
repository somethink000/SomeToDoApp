

function createTaskBox(event) {
    var input = document.getElementById("newTaskBoxInput");

    globalThis.tasksDataController.createTaskBox(input.value, 0).then(() => {

        globalThis.tasksDataController.getLastTaskBox().then((response) => {

            let lastTaskBox = response[0]
            event.target.closest(".createTaskbox").remove()
            addTaskBox(lastTaskBox)
            syncTaskBoxesSort()
        });
    });
}


function removeTaskBox(event) {
    let parentTaskbox = event.target.parentNode.parentNode.parentNode.parentNode
    let taskBoxId = parentTaskbox.id.slice(7, 8)

    globalThis.tasksDataController.removeTasksByBox(taskBoxId).then(() => {
        globalThis.tasksDataController.removeTaskBox(taskBoxId).then(() => {
            parentTaskbox.remove();
        });
    });


}