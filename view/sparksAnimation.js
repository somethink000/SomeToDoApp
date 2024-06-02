document.addEventListener("DOMContentLoaded", () => {

    const sparksContainer = document.getElementById("particles_container");

    for ($i = 1; $i <= 100; $i++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'circle-container');
        div.innerHTML = `<div class="circle"></div>`

        sparksContainer.append(div);
    }
});