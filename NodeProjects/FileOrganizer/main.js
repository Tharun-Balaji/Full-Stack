
const fs = require('fs');
const path = require('path');

const inputArr = process.argv.slice(2);
// console.log(inputArr);
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help

const command = inputArr[0];

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

switch (command) {
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Please 🙏 Input Right command");
        break;
}

function treeFn(dirPath){
    // console.log("Tree command Implemented for" ,dirPath);
   
}

function organizeFn(dirPath){
    // console.log("Organize command Implemented for" ,dirPath);

    if ( dirPath === undefined){
        console.log("Please 🙏 Enter the directory path");
        return;
    }

    //checking if the directory exists
    if ( !fs.existsSync(dirPath) ){
        console.log("Please 🙏 Enter the correct directory path");
        return;
    }


    // creating the directory to store the files
    const DestinationPath = path.join(dirPath,"Organized_Files");
    if (!fs.existsSync(DestinationPath)){
        fs.mkdirSync(DestinationPath);
    }



}

function helpFn(){
    console.log(
      `List of All the commands
            node main.js tree "directoryPath"
            node main.js organize "directoryPath"
            node main.js help
        `
    );
}


