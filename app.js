const express = require("express");
const res = require("express/lib/response");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello test world~@@@!@");
});

app.listen(port, () => {
  console.log(`서버 실행된다 http://localhost:${port}`);
});

const fs = require("fs");

// fs.mkdir("our-fs", (err) => console.log(err));
// try {
//     fs.mkdirSync("our-fs");
//   } catch (err) {
//     console.log(err);
//   }

let sourceHtml;
fs.readFile("1300_융합.htm", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
    sourceHtml = data;
    funStartParsing();
  }
});

const DOMParser = require("https://deno.land/x/deno_dom/deno-dom-wasm.ts");

const funStartParsing = async () => {
  console.log("----start----!!!!!!!!!!!!!!!!!!!!!!");
  let ddd = new DOMParser();
  let domdom = ddd.parseFromString(sourceHtml, "text/html");
  // let bbbb = domdom.getElementsByTagName('body')[0].textContent
  let bbbb = domdom.getElementsByTagName("body")[0];
  // console.log('  bbbb  : ',  bbbb   )
  let unit = divideText(bbbb.textContent);

  let tagDiv = newTag("div", null);
  let tagTitle = newTag("div", "title");
  tagTitle.innerHTML = unit.title;
  // console.log('----tagTitle----', tagTitle)

  let tagBody = newTag("div", "body");
  tagBody.innerHTML = unit.body;

  let tagQ1 = newTag("div", "question");
  tagQ1.innerHTML = unit.question[0];
  let tagA1 = newTag("div", "answer");
  tagA1.innerHTML = unit.answer[0];
  // tagQ1.append(tagA1)

  let tagQ2 = newTag("div", "question");
  tagQ2.innerHTML = unit.question[1];
  let tagA2 = newTag("div", "answer");
  tagA2.innerHTML = unit.answer[1];
  // tagQ2.append(tagA2)

  let tagQ3 = newTag("div", "question");
  tagQ3.innerHTML = unit.question[2];
  let tagA3 = newTag("div", "answer");
  tagA3.innerHTML = unit.answer[2];
  // tagQ3.append(tagA3)

  tagDiv.append(tagTitle, tagBody, tagQ1, tagQ2, tagQ3, tagA1, tagA2, tagA3);
  console.log("----tagDiv----", tagDiv);
  // let result = [tagTitle, tagBody, tagQ1, tagQ2, tagQ3]
  // for (let i in result) {
  //   console.log('----result---',result[i])
  // }
  // exam.value = result
  console.log("----end----***********************");
};

// indexOf로 쪼개기
const divideText = (whole) => {
  let bb = whole.trim();

  // indexOf로 자를 지점 정리.
  let indexTitle = bb.indexOf("답하시오.") + 4;

  let indexQ1 = bb.indexOf("(문1)");
  let indexA1 = bb.indexOf("(정답)", indexQ1 + 1);

  let indexQ2 = bb.indexOf("(문2)");
  let indexA2 = bb.indexOf("(정답)", indexQ2 + 1);

  let indexQ3 = bb.indexOf("(문3)");
  let indexA3 = bb.indexOf("(정답)", indexQ3 + 1);

  // errorCheck -1
  let checkArr = [
    indexTitle,
    indexQ1,
    indexA1,
    indexQ2,
    indexA2,
    indexQ3,
    indexA3,
  ];
  console.log("checkArr : ", checkArr.join);
  for (let i in checkArr) {
    if (checkArr[i] < 0) {
      console.error("MY ERROR : 해당 문자열이 없단다.");
      break;
    }
  }

  // 자르기
  let title = bb.slice(0, indexTitle);
  let body = bb.slice(indexTitle, indexQ1);
  let q1 = bb.slice(indexQ1, indexA1);
  let a1 = bb.slice(indexA1, indexQ2);
  let q2 = bb.slice(indexQ2, indexA2);
  let a2 = bb.slice(indexA2, indexQ3);
  let q3 = bb.slice(indexQ3, indexA3);
  let a3 = bb.slice(indexA3, bb.length);

  // console.log('----title----', title)
  // console.log('----q1----', q1)
  return {
    title: title,
    body: body,
    question: [q1, q2, q3],
    answer: [a1, a2, a3],
  };
};
