# Mutation Observer 

돔트리를 관찰(observe)하며 돔에 변경이 생기기를 대기 한다. 

|constructor|MutationObserver()|mutation observer 객체를 리턴|
|------|---|---|
|methods|observe(target, options)|돔에 변화의 notice를 받기 시작한다.target - observe가 필요한 엘리먼트,   options - observer의 구성       |


## use cases
 
  1. 돔엘리먼트의 undo redo 값을 찾는다.
  2. third-party 라이브러리로 부터 나오는 광고같은 원치 않는 돔 엘리먼트를 제거한다. 
  3. 돔엘리먼트를 다이나믹하게 리사이즈한다.
  4. third-party 라이브러리의 디버깅을 더 쉽게 한다. 


# Interaction Observer 

돔트리의 비쥬얼과 위치를 관찰하는 api 이다. 엘리먼트의 로딩과 애니메이션을 타겟 앨리먼트의 비쥬얼, 위치 등의 정보를 기초로 하여 조종할 수 있다. 

## use cases
 
  1. Lazy Loading
  2. 무한 스크롤  
  3. 애니메이션 - 페이지가 스크롤 될 때 애니메이션을 구현 한다. 
  4. 유저 인터렉션의 추적 - 유저가 완전히 아티클이나 광고를 읽거나 읽지 않거나, 타이머 등을 멈출 수 있다. 유저가 광고를 보지 않는다고 가정하면. 
  5. 플레이 비디오 - 뷰포트 안에서 플레이를 조종한다. 

## example - 스크롤 예제 

### parameter methods, properties 


```javascript
new IntersectionObserver(callback, options);
```

 - parameters 

 callback: 관찰이 시작되는 시점에서 실행되는 함수, 2개의 파라미터를 가진다. 


 entries: IntersectionObserverEntry 객체들을 배열로 반환
 observer: IntersectionObserver instance 

 options: 관칠이 시작되는 상황에 대한 옵션 설정 --> 기본값은 정해져 있음 

```javascript
import React, { useEffect, useState, useContext } from 'react';

function ProdcutPage() {
  const [target, setTarget] = useState(null);

  const fetchProductItems = (url) => {
    const productItems = apiProductItems(url);

    if (!productItems) {
      actions.isLoaded(dispatch)(false);
      return;
    }
    //....추가 로직
  }

  useEffect(() => {
    let observer;

    if (target) {
      observer = new IntersectionObserver(_onIntersect, { threshold: 1 });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();

  }, [target])

  // callback 
  const _onIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      fetchProductItems()
    }
  }

}


```

 다른 예제
 ```javascript
// 참조 http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/
const Observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0 ) {
      entry.target.classList.add('tada');
    }

    else {
      entry.target.classList.remove('tada');
    }

  })
})

const boxList = document.querySelectorAll('.box');
boxList.forEach(el => {
  Observer.observe(el);
})




```