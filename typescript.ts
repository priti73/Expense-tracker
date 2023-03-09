const num1Ele=document.getElementById('num1') as HTMLInputElement;
const num2Ele=document.getElementById('num2') as HTMLInputElement;
const buttonEle=document.querySelector('button')!;

const numResults: Array<number>=[];
const textResults: string[]=[];

type NumOrString =number | string;
type Result={val :number, timestamp: Date};

interface Resultobj{
    val :number;
    timestamp: Date;
}

function add(num1: NumOrString ,num2:NumOrString){
    if(typeof num1=== 'number' && typeof num2==='number'){
        return num1 +num2;
    }
    else if(typeof num1=== 'string' && typeof num2==='string'){
        return num1 + ' '+num2;
    }
    return +num1+  +num2;
}
function printResult(resultObj :Resultobj){
   console.log(resultObj.val);
}

buttonEle.addEventListener('click',function() {
    const num1=num1Ele.value;
    const num2=num2Ele.value;
    const res=add(+num1, +num2);
    numResults.push(res as number);
    const stringres=add(num1 ,num2);
    textResults.push(stringres as string);
    printResult({ val: res as number, timestamp : new Date()})
   console.log(numResults,textResults);
});

const myPomise= new Promise<string>((resolve,reject)=>{
  setTimeout(()=>{
    resolve('It worked');
  },1000);
});

myPomise.then((result)=>{
    console.log(result.split('w'));
})