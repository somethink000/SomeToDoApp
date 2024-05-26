// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`


function fetchJSONData() {
    fetch("./data/tasks.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => 
              console.log(data))
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}


const information = document.getElementById('info')
information.innerText = fetchJSONData()

console.log("wwdwdw")
      