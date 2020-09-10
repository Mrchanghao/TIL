"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 함수 오버로드
function makeArr(defaultVal, size) {
    var arr = [];
    for (var i = 0; i < size; i++) {
        arr.push(defaultVal);
    }
    return arr;
}
var arr1 = makeArr(1, 10);
var arr2 = makeArr('strig', 2);
