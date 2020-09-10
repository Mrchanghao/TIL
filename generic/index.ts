export {};

function makeArr(defaultVal: number, size: number): number[];

function makeArr(defaultVal: string, size: number): string[];


// 함수 오버로드
function makeArr(defaultVal: number | string, size: number): Array<number | string> {
  let arr: Array<number | string> = [];
  for(let i = 0; i < size; i++) {
    arr.push(defaultVal);
  }
  return arr;
}

const arr1 = makeArr(1, 10);
const arr2 = makeArr('strig', 2);