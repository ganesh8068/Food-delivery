var fs = require("fs");
console.log(" ----- file reading synchronosly ----- ");
var data = fs.readFileSync("fread.txt", "utf-8");
console.log(data);
console.log(" ----- sync reading done ----- ");

// async 
console.log(" ----- file reading async ----- ");
fs.
