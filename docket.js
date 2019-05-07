//57 letters, not using 0, o, O, l, 1 since these character may make people confused
const charsetList = {
  // 52*5=260 stores
  // 52
  storeId1: [
    "P",
    "d",
    "g",
    "Y",
    "G",
    "H",
    "M",
    "Q",
    "c",
    "n",
    "x",
    "C",
    "k",
    "9",
    "t",
    "R",
    "B",
    "I",
    "4",
    "q",
    "W",
    "6",
    "a",
    "m",
    "y",
    "8",
    "b",
    "F",
    "h",
    "5",
    "Z",
    "J",
    "2",
    "i",
    "A",
    "E",
    "K",
    "7",
    "j",
    "X",
    "e",
    "3",
    "D",
    "w",
    "S",
    "p",
    "r",
    "U",
    "z",
    "f",
    "L",
    "N"
  ],
  // 5
  storeId2: ["Z", "R", "k", "t", "s"],
  // 31 days
  date: [
    "8",
    "f",
    "4",
    "A",
    "s",
    "N",
    "y",
    "x",
    "c",
    "F",
    "I",
    "X",
    "g",
    "u",
    "e",
    "E",
    "Z",
    "M",
    "2",
    "z",
    "k",
    "H",
    "n",
    "a",
    "P",
    "t",
    "6",
    "S",
    "D",
    "C",
    "7"
  ],
  // 12 months
  month: ["Q", "H", "T", "I", "L", "Y", "h", "E", "f", "t", "G", "d"],
  // 10 years
  year: ["c", "9", "z", "s", "6", "f", "V", "i", "W", "v"],
  // transactionId 57*57*5=16245
  transactionId1: [
    "g",
    "Q",
    "4",
    "J",
    "p",
    "z",
    "H",
    "m",
    "y",
    "T",
    "u",
    "v",
    "n",
    "e",
    "D",
    "X",
    "B",
    "U",
    "P",
    "a",
    "s",
    "f",
    "d",
    "7",
    "Z",
    "3",
    "j",
    "K",
    "N",
    "c",
    "x",
    "A",
    "E",
    "F",
    "Y",
    "9",
    "L",
    "b",
    "M",
    "V",
    "2",
    "G",
    "I",
    "W",
    "k",
    "i",
    "S",
    "6",
    "C",
    "r",
    "w",
    "q",
    "h",
    "t",
    "R",
    "5",
    "8"
  ],
  transactionId2: [
    "k",
    "N",
    "L",
    "c",
    "u",
    "s",
    "Z",
    "B",
    "y",
    "2",
    "R",
    "f",
    "9",
    "3",
    "x",
    "d",
    "S",
    "H",
    "n",
    "i",
    "7",
    "D",
    "Q",
    "t",
    "5",
    "z",
    "e",
    "w",
    "6",
    "J",
    "r",
    "I",
    "Y",
    "E",
    "v",
    "X",
    "T",
    "V",
    "C",
    "8",
    "j",
    "M",
    "4",
    "b",
    "W",
    "G",
    "F",
    "m",
    "q",
    "p",
    "P",
    "h",
    "U",
    "g",
    "a",
    "K",
    "A"
  ],
  transactionId3: ["k", "j", "h", "N", "C"],
  checker: [
    "5",
    "i",
    "B",
    "M",
    "V",
    "C",
    "j",
    "m",
    "Y",
    "e",
    "w",
    "D",
    "n",
    "z",
    "N",
    "3",
    "T",
    "f",
    "W",
    "r",
    "H",
    "8",
    "L",
    "x",
    "Z",
    "p",
    "h",
    "7",
    "g",
    "K",
    "P",
    "d",
    "q",
    "R",
    "t",
    "A",
    "9",
    "U",
    "c",
    "G",
    "u",
    "4",
    "k",
    "y",
    "S",
    "v",
    "J",
    "2",
    "I",
    "b",
    "E",
    "Q",
    "6",
    "s",
    "F",
    "a",
    "X"
  ]
};

function generateShortCode(storeId, transactionId) {
  let result = [];

  // storeId
  result.push(storeId % charsetList.storeId1.length);
  result.push(Math.floor(storeId / charsetList.storeId1.length));

  // shopDate
  const today = new Date();
  let year = today.getFullYear() - 2019;
  result.push(year);
  result.push(today.getMonth());
  result.push(today.getDate() - 1);

  // transactionId
  const divider1 = Math.floor(
    transactionId /
      (charsetList.transactionId1.length * charsetList.transactionId2.length)
  );
  const remainder1 =
    transactionId -
    divider1 *
      (charsetList.transactionId1.length * charsetList.transactionId2.length);
  const divider2 = Math.floor(remainder1 / charsetList.transactionId2.length);
  const remainder2 = remainder1 - divider2 * charsetList.transactionId2.length;
  result.push(remainder2);
  result.push(divider2);
  result.push(divider1);

  const sum = result.reduce((sum, val) => (sum += val));
  const offset = sum % charsetList.checker.length;

  // convert to symbol (add offset)
  const convertToSymbol = (originIndex, charsetName) => {
    return charsetList[charsetName][
      (originIndex + offset) % charsetList[charsetName].length
    ];
  };

  result[0] = convertToSymbol(result[0], "storeId1");
  result[1] = convertToSymbol(result[1], "storeId2");
  result[2] = convertToSymbol(result[2], "year");
  result[3] = convertToSymbol(result[3], "month");
  result[4] = convertToSymbol(result[4], "date");
  result[5] = convertToSymbol(result[5], "transactionId1");
  result[6] = convertToSymbol(result[6], "transactionId2");
  result[7] = convertToSymbol(result[7], "transactionId3");
  result[8] = charsetList.checker[offset];

  result = result.reduce((result, current) => (result += current), "");

  return result;
}

function getDigitWithOffset(symbol, listName, offset) {
  let index = charsetList[listName].indexOf(symbol);
  index = index - offset;
  while (index < 0) {
    index += charsetList[listName].length;
  }
  return index;
}

function decodeShortCode(shortCode) {
  const offset = charsetList.checker.indexOf(shortCode[8]);

  const getDigit = (symbol, listName) => {
    return getDigitWithOffset(symbol, listName, offset);
  };
  const digits = [];
  digits[0] = getDigit(shortCode[0], "storeId1");
  digits[1] = getDigit(shortCode[1], "storeId2");
  digits[2] = getDigit(shortCode[2], "year");
  digits[3] = getDigit(shortCode[3], "month");
  digits[4] = getDigit(shortCode[4], "date");
  digits[5] = getDigit(shortCode[5], "transactionId1");
  digits[6] = getDigit(shortCode[6], "transactionId2");
  digits[7] = getDigit(shortCode[7], "transactionId3");

  // validator
  const sum = digits.reduce((sum, value) => (sum += value));
  if (sum % charsetList.checker.length !== offset) {
    return "invalid shortCode";
  }

  // storeId
  const storeId = digits[0] + digits[1] * charsetList.storeId1.length;

  // shopDate
  const year = digits[2] + 2019;
  const month = digits[3];
  const date = digits[4] + 1;
  const shopDate = new Date(year, month, date);

  // transactionId
  const transactionId =
    digits[5] +
    digits[6] * charsetList.transactionId1.length +
    digits[7] *
      (charsetList.transactionId1.length * charsetList.transactionId2.length);

  return {
    storeId: storeId, // store id goes here,
    shopDate: shopDate, // the date the customer shopped,
    transactionId: transactionId // transaction id goes here
  };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {
  var storeIds = [175, 42, 0, 9];
  var transactionIds = [9675, 23, 123, 7];

  storeIds.forEach(function(storeId) {
    transactionIds.forEach(function(transactionId) {
      var shortCode = generateShortCode(storeId, transactionId);
      var decodeResult = decodeShortCode(shortCode);
      $("#test-results").append(
        "<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>"
      );
      AddTestResult("Length <= 9", shortCode.length <= 9);
      AddTestResult("Is String", typeof shortCode === "string");
      AddTestResult("Is Today", IsToday(decodeResult.shopDate));
      AddTestResult("StoreId", storeId === decodeResult.storeId);
      AddTestResult(
        "transactionId",
        transactionId === decodeResult.transactionId
      );
    });
  });
}

function IsToday(inputDate) {
  // Get today's date
  var todaysDate = new Date();
  // call setHours to take the time out of the comparison
  return inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);
}

function AddTestResult(testName, testResult) {
  var div = $("#test-results").append(
    "<div class='" +
      (testResult ? "pass" : "fail") +
      "'><span class='tname'>- " +
      testName +
      "</span><span class='tresult'>" +
      testResult +
      "</span></div>"
  );
}

let shortCode = generateShortCode(100, 6262);
console.log(shortCode);
let decode = decodeShortCode(shortCode);
console.log(decode);

shortCode = generateShortCode(0, 3263);
console.log(shortCode);
decode = decodeShortCode(shortCode);
console.log(decode);
