const express = require("express");
const res = require("express/lib/response");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello test world~@@@!@");
});

app.listen(port, () => {
  console.log(`서버 실행 http://localhost:${port}`);
});

// const path = require("path");

// fs.mkdir("our-fs", (err) => console.log(err));
// try {
//     fs.mkdirSync("our-fs");
//   } catch (err) {
//     console.log(err);
//   }

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

const fs = require("fs");
const parse = require("./parse");

let files = [];

readDir();
// read();

// 폴더 전체 가져오기
function readDir() {
    
//   console.log("parse");
//   parse.aaaa1();
//   parse.aaaa2(); 

  let folder = "./files";
  //   var folder = fs.readdirSync(dir); // 디렉토리를 읽어온다
  fs.readdir(folder, function (err, data) {
    if (err) {
    } else {
      console.log("completed readDir----");
      files = [...data];
      console.log(files);

      for (let i in files) {
        read(i);
      }
      //   let cut = files[0].slice(0, -5);
    }
  });
}

function read(i) {
  fs.readFile(`./files/${files[i]}`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("success----", i);
 
        let result = parse.ttttttest(data)  
      write(i, result);

      //   funStartParsing();
      //   fs.writeFileSync("result/test.html", data);
    }
  });
}

function write(i, data) {
  fs.writeFileSync(`result/${files[i]}`, data);
}



 