

// class JsonStorage {

//     data;


//     constructor( table ) {
        
        
//         const fs = require('fs');
//         const filePath = ("./data/" + table + ".json");

//         try {
//             if (fs.existsSync( filePath )) {
//                 fetchJSONData( filePath );
//             } else {
//                 fs.writeFile( filePath );
//                 fetchJSONData( filePath );
//             }
//         } catch(err) { }
//     }

//     fetchJSONData(table) {
//         fetch( table )
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error
//                         (`HTTP error! Status: ${res.status}`);
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 console.log(data);
//                 this.data = data;
//             })
//             .catch((error) => 
//                     console.error("Unable to fetch data:", error));
//     }
    

   
// }
