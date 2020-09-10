"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var pMap = {};
pMap.name = true;
pMap.age = false;
var Fruit;
(function (Fruit) {
    Fruit[Fruit["Apple"] = 0] = "Apple";
    Fruit[Fruit["Banna"] = 1] = "Banna";
    Fruit[Fruit["Orange"] = 2] = "Orange";
})(Fruit || (Fruit = {}));
;
//enum 으로 속성 값들 정의 할 때 mapped 타입 정의 하자
var FRUIT_PRICE = (_a = {},
    _a[Fruit.Apple] = 1000,
    _a[Fruit.Banna] = 1500,
    _a[Fruit.Orange] = 2000,
    _a);
