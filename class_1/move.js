const path = require("path");
const fs = require('fs');

const srcPath = "C:\\Users\\Tharunbalaji\\Scaler Class and Notes\\Full Stack\\class_1\\Directory\\file.md";
const destDirectory = "C:\\Users\\Tharunbalaji\\Scaler Class and Notes\\Full Stack\\class_1\\new_directory";

const baseName = path.basename(srcPath);

// const destPath = destDirectory+'/'+baseName;
const destPath = path.join(destDirectory,baseName);

// console.log(destPath);

fs.copyFileSync(srcPath,destPath);

fs.unlinkSync(srcPath);

console.log("File has been moved");