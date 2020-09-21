# 뛰어난 자바스크립트 개발자를 발견하는 4가지 인터뷰 문제 

1. 직접 ```Array.prototype.map```을 구현

- 직접 ```map, reduce```등의 내장 함수를 구현 해 내야 한다. 

```javascript
Array.prototype._map = function(callbackfn, thisArg) {
  let result = new Array(this.length);
  // ...

  return result;
}
// 내부의 this는 원래 배열을 가리킨다. (하지만 화살표 함수로 구현시 window 혹은 글로벌 객체)

```

아래 코드를 추가한다. 

```
let copiedArr = Array.prototype.slice.call(this)
```
call()은 상위 컨텍스트를 변경하는 메서드이고 this 값을 array로 변환한다는 의미. 
--> ES6에서는 Array.from()으로 대체 할 수 있다. 


즉, 다시 위의 _map 구현 코드로 돌아가면 새로운 배열을 만들어서 모든 배열 요소에 대해 함수를 호출한 결과로 새 배열을 리턴한다는 의미 

```javascript
Array.prototype._map = function(callbackfn, thisArg) {
  let archiveArr = Array.prototype.slice.call(this)
  let result = new Array(archiveArr.length);

  for (let index = 0; index < archiveArr.length; i++) {
    let newElement = callbackfn(archiveArr[index], index, this)
    result[index] = newElement;
  }

  return result;
}
```

정상적으로 작동하는 것 같지만 실제로는 약간의 버그가 있다. 예를 들어 
```javascript
let arr = [1, 2, 3]

delete arr[1]

arr.map(x => x + 1) // [2. empty, 4]
arr._map(x => x + 1) // [2, NaN, 4]
```
콜백함수는 실제로 존재하는 요소에 대해서만 호출되기 때문에 NaN으로 리턴 됩니다. 

그러므로 콜백을 실행하기 전에 체크를 하고 넘어가야 한다. 구현 코드에서 아래의 벨리데이션 코드를 추가해 준다. 
```javascript
Array.prototype._map = function(callbackfn, thisArg) {
  let archiveArr = Array.prototype.slice.call(this)
  let result = new Array(archiveArr.length);

  for (let index = 0; index < archiveArr.length; i++) {
    // 아래 코드 추가 
    if(!archiveArr.hasOwnProperty(i)) continue;
    // 
    let newElement = callbackfn(archiveArr[index], index, this)
    result[index] = newElement;
  }

  return result;
}
```

위와 같은 방식으로 _filter 함수도 구현 할 수 있다 .

```javascript
Array.prototype._filter = function(callbackfn, thisArg) {
  let archiveArr = Array.prototype.slice.call(this);
  let filledArr = [];

  for (let i = 0; i < archiveArr.length; i++) {
    if(!archiveArr.hasOwnProperty(i)) continue;
    if(callbackfn.call(thisArg, archiveArr[i], i, this)) {
      filledArr.push(archiveArr[i])
    }
  }
  return filledArr;
}
```


2. <code>Object.defineProperty</code> and Proxy

어떻게 아래의 효과를 낼 수 있을까? 
```javascript
console.log(obj.a, obj.a, obj.a) // 1 2 3
```

세가지 솔루션이 가능

- accessor property
- Object.defineProperty
- Proxy

객체는 논리적으로 속성의 모음체라고 할 수 있다. 각 속성들은 데이터속성이거나 접근자 속성이라고 한다. 

- 데이터 속성은 key, value로 이루어진.
- 접근자 속성은 하나 혹은 두개의 접근자 함수나 boolean 속성의 셋의 key, value로 이루어져 있다. 

```javascript
// ex) data props
let obj = {
  a: 1,
  b: 2,
}
// ex) accessor props 
let obj2 = {
  get a() {
    console.log('triggle get a() method')
    console.log('you can do anithing as you want')
    return 1
  },
  set a(value) {
    console.log('triggle set a() method')
    console.log('you can do anithing as you want')
    console.log(`you are trying to assign ${value}`)
  }
}
```

속성에 접근하는 것은 메타프로그래밍 능력에 크게 도움을 준다. 그러므로 다음과 같은 방식으로 처음 문제를 해결 할 수 있다. 

```javascript
let obj = {
  _initialValue: 0,
  get a() {
    this._initialValue;
    return this._initialValue;
  }
}

```

두번째 방법으로 Object.defineProperty를 이용 한다. 좀더 위의 방식보다 유연한 방식으로 구현이 가능한다. 

```javascript
let obj = {}
Object.defineProperty(obj, 'a', {
  get: (function() {
    let initialValue = 0;
    return function() {
      initialValue++;
      return initialValue;
    }
  })()
})

```
세번째 방법은 Proxy로 익숙하지 않다면 아래 링크의 글을 참조하자 


### [Proxy 관련 Article](https://medium.com/javascript-in-plain-english/why-proxies-in-javascript-are-fantastic-db100ddc10a0)

Proxy를 이용하여 객체 속성에 접근할 수 있다. 

```javascript
let initialValue = 0;
let obj = new Proxy({}, {

})


```
Proxy는 아래와 같은 메소드 등으로 객체를 컨트롤 할 수 있다. 
- get(item, propKey, itemProxy)
- set(item, propKey, value, itemProxy)
- has(item, propKey)
- deleteProperty(item, propKey)
- ownKeys(item)
- getOwnPropertyDescriptor(item, propKey)
- defineProperty(item, propKey, propDesc)
....