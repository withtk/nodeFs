module.exports.aaaa1 = (text) => {
  console.log("aaaa1");
};

module.exports.aaaa2 = (text) => {
  console.log("text");
};

module.exports.funStartParsing = async () => {
  console.log("----start----!!!!!!!!!!!!!!!!!!!!!!");
  // let ddd = new DOMParser()
  // let domdom = ddd.parseFromString(contents.value, 'text/html')
  // let bbbb = domdom.getElementsByTagName('body')[0]
  // console.log('--bbbb--', JSON.stringify(bbbb.textContent))
  // start(bbbb.textContent)
  start(contents.value);

  console.log("----end----***********************");
};

module.exports.start = (text) => {
  change(text);
};

const wordHref = 'href="../myCustom.css"';
const newwordHref = 'href="assets/questions/myCustom.css"';

// comment 삽입.
const wordTitle = '<div class="title">';
const newwordTitle = '<div class="exam"><div class="title">';

const wordAnswer = 'class="answer"';
const newwordAnswer = 'style="display: none"';

const wordSpan = "(정답)</span>";
const newwordSpan = '(정답)</span><span class="answer">aaaa</span>';

const wordBogey = 'class="mmBogey"';
const newwordBogey = 'class="mmBogey item"';

const wordCloseBody = "</body>";
const newwordCloseBody = "</div></body>";

module.exports.ttttttest = (text) => {
  return text
    .replaceAll(wordHref, newwordHref)
    .replaceAll('style="display: none"', 'class="comment"');
  // .replaceAll(wordAnswer, newwordAnswer)
  // .replaceAll(wordSpan, newwordSpan)
  // .replaceAll(wordBogey, newwordBogey)
  // .replaceAll(wordCloseBody, newwordCloseBody);
};

///////////////////////////
///////////////////////////
///////////////////////////
module.exports.change = (text) => {
  let result = text
    .replaceAll(wordHref, newwordHref)
    .replaceAll(wordTitle, newwordTitle)
    .replaceAll(wordAnswer, newwordAnswer)
    .replaceAll(wordSpan, newwordSpan)
    .replaceAll(wordBogey, newwordBogey)
    .replaceAll(wordCloseBody, newwordCloseBody);
  // console.log('--a--', a)

  // 정답해설 리스트
  let answerArr = getAnswerArr(result, '<div style="display: none">', "</div>");
  // console.log('--answerArr--', answerArr)
  // 정답번호 리스트
  let answerNoArr = getAnswerNoArr(answerArr);
  console.log("--answerNoArr--", answerNoArr);
  attachAnswer(answerArr, answerNoArr);

  // 문제  리스트
  let quesArr = getQuesArr(result);
  // console.log('--quesArr--', quesArr)

  // 기존의 정답번호 삭제
  delAnswerNo(answerArr, answerNoArr);

  // 문제 question 안쪽 하단에 정답해설 넣기
  arrangeQues(quesArr, answerArr);

  //전체 붙이기
  // const inxCloseBody = result.indexOf('</body>')
  let finalSplit = result.split('<div class="question">');
  let finalResult = finalSplit[0];

  sample.value = finalResult + quesArr[0] + quesArr[1] + quesArr[2];
  contents.value = "";
};

module.exports.getQuesArr = (text) => {
  const endWord = '<div style="display: none">';
  const iArr = indexAllArr(text, '<div class="question">');

  let ans1 = text.slice(iArr[0], iArr[1]);
  let ans2 = text.slice(iArr[1], iArr[2]);
  let ans3 = text.slice(iArr[2], text.indexOf(endWord));

  // console.log('--getQuesArr--1--', ans1)
  // console.log('--getQuesArr--2--', ans2)
  // console.log('--getQuesArr--3--', ans3)

  const re = [ans1, ans2, ans3];
  // console.log('--getQuesArr--', re)
  return re;
};

module.exports.delAnswerNo = (answerArr, noArr) => {
  for (let i in answerArr) {
    let idxArr = indexAllArr(answerArr[i], noArr[i]);

    let aa = answerArr[i].slice(0, idxArr[1]);
    let bb = answerArr[i].slice(idxArr[1] + 1, answerArr[i].length);
    //   console.log(`--delAnswerNo--${i}-aa-`, aa)
    //   console.log(`--delAnswerNo--${i}-bb-`, bb)

    answerArr[i] = aa + bb;
    //   for (let j in idxArr) {
    //     // console.log(`--spl--${i}--`, spl[i])
    //     if (j != 1) {
    //       answerArr[i] = answerArr[i] + idxArr[j]
    //     }
    //   }
    //   console.log(`--answerArr--${i}--`, answerArr[i])
  }
};

module.exports.arrangeQues = (quesArr, answerArr) => {
  for (let i in quesArr) {
    let inxArr = indexAllArr(quesArr[i], "</div>");
    let aa = quesArr[i].slice(0, inxArr[inxArr.length - 1]);
    quesArr[i] = aa + answerArr[i] + "</div>";
  }
};

// 모든 인덱스 찾기
module.exports.indexAllArr = (result, keyword) => {
  const iArr = [];
  // 인덱스 찾기
  let i = result.indexOf(keyword);
  while (i != -1) {
    iArr.push(i);
    i = result.indexOf(keyword, i + 1);
  }
  console.log("--length i--", iArr);
  return iArr;
};

module.exports.getAnswerArr = (result, keyword, endWord) => {
  // 인덱스 찾기
  const iArr = indexAllArr(result, keyword);
  // let i = result.indexOf(keyword)
  // while (i != -1) {
  //   iArr.push(i)
  //   i = result.indexOf(keyword, i + 1)
  // }
  // console.log('--length i--', iArr)

  let ans1 = result.slice(iArr[0], iArr[1]);
  let ans2 = result.slice(iArr[1], iArr[2]);
  let ans3 = result.slice(iArr[2], result.indexOf(endWord, iArr[2]) + 6);

  result = result.replace(ans1, "").replace(ans2, "").replace(ans3, "");

  // console.log('--result rererer--', result)

  // console.log('--getAnswerArr--1--', ans1)
  // console.log('--getAnswerArr--2--', ans2)
  // console.log('--getAnswerArr--3--', ans3)
  return [ans1, ans2, ans3];
};

module.exports.getAnswerNoArr = (arr) => {
  const re = [];
  const str = "aaaa</span>";
  const end = "</p>";
  for (let i in arr) {
    re.push(getAmongText(arr[i], str, end));
  }
  return re;
};

// 사이에 있는 텍스트 가져오기
module.exports.getAmongText = (text, startWord, endWord) => {
  // 앞문자로 split
  // -> split[1]로 뒷문자로 split 후
  // => return [0].trim()
  let first = text.split(startWord);
  let second = first[1].split(endWord);
  return second[0].trim();
};

// 정답해설에 정답번호 넣기
module.exports.attachAnswer = (arr, arr2) => {
  for (let i in arr) {
    arr[i] = arr[i].replace("aaaa", arr2[i]);
  }
};
