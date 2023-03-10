var num1Ele = document.getElementById('num1');
var num2Ele = document.getElementById('num2');
var buttonEle = document.querySelector('button');
var numResults = [];
var textResults = [];
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}
function printResult(resultObj) {
    console.log(resultObj.val);
}
buttonEle.addEventListener('click', function () {
    var num1 = num1Ele.value;
    var num2 = num2Ele.value;
    var res = add(+num1, +num2);
    numResults.push(res);
    var stringres = add(num1, num2);
    textResults.push(stringres);
    printResult({ val: res, timestamp: new Date() });
    console.log(numResults, textResults);
});
var myPomise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('It worked');
    }, 1000);
});
myPomise.then(function (result) {
    console.log(result.split('w'));
});
