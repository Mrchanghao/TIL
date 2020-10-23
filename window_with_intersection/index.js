console.log('슬슬 공부해 볼까?')
/*
Intersection Observer API

- 비동기적으로 타겟 엘리먼트의 인터렉션을 감지하고 관찰하는 메소드등을 제공하는 api

많은 부분에 사용된다. 
-> lazy loading 
-> 인피니트 스크롤
-> 광고 뷰 계산
-> 애니메이션 작동을 할 것인가 말 것인가 결정

세가지 조건 
root element: 없을시에는 디바이스의 뷰포트 
target element:
callback: target과 root사이에서의 인터렉션이 일어 났을 때 호출하는 함수
*/

// todo -  use api to lazy loading image or content as page is scrolled 
/*
target 이 root엘리먼트의 바운드 안에 있을 때는 isIntersection = true;
target 이 root엘리먼트의 바운드 밖에 있을 때 isIntersection = false;
*/

// const element = document.querySelectorAll('.listElement');
// const container = document.querySelector('.container');

// console.log(element)

// let toggle = false;


// const intersectionCallback = (entries) => {
//   entries.forEach(entry => {
//     if(entry.isIntersecting) {
//       entry.isVisible = true;
//       entry.target.classList.add('toggle');
//       // console.log(entry.target.classList  'toggle')
//       // element is intersecting with the container - render it to the DOM!
//     } else {
//       entry.isVisible = false;
//       // entry.target.classList.remove = 'toggle';
//       // Element is _NOT_ intersecting with the container - hide it from the DOM.
//     }
//   })
// }

// const intersectionObserver = new IntersectionObserver(intersectionCallback, {
//   root: container,
//   rootMargin: '0px',
//   threshold: 1.0,
// })




// intersectionObserver.observe(element[4]);
// intersectionObserver.observe(element[5]);


const images = document.querySelectorAll('.anim');

observer = new IntersectionObserver((entries) => {
  console.log(entries);
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `anim1 2s ${entry.target.dataset.delay} forwards ease-out`;
    } else {
      entry.target.style.animation = 'none';
    }
  
  })
 
});
images.forEach(image => {
  observer.observe(image);
})
