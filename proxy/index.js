class Greet {

  english() {
    return 'hello';
  }

  spanish() {
    return 'holla';
  }

};

class MoreGreet {
  korean() {
    return '안녕?'
  }

  chinese() {
    return 'ni hao?'
  }
}

const greetings = new Greet();
const moreGreeting = new MoreGreet();

const allGreet = new Proxy(moreGreeting, {
  get: function(target, property) {
    // console.log(target, property);
    return target[property] || greetings[property]
  }
});

console.log(allGreet.english ) // [Function: english] 
console.log(allGreet.korean ) // [Function: korean] 


// proxy pattern으로 page에서 
// 두개의 객체, 페이지에 접근 가능
// const allPages = new Proxy(secondPage, {
//   get: function(page, property) {
//     return page[property] || originalPage[property];
//   }
// })

class Page {
  goto() {
    console.log('iam going to another page');
  }
  setCookie() {
    console.log('i am setting a cookie and bake');
  }
}

class CustomPage {

  static buildPage = () => {
    const page = new Page();
    const customPage = new CustomPage(page);
  
  
    const allPages = new Proxy(customPage, {
      get: function(target, property) {
        return target[property] || page[property];
      }
    })
    return allPages;
  }

  constructor(page) {
    this.page = page;
  }

  login() {
    this.page.goto('localhost:3000');
    this.page.setCookie();
  }

}






/*
다른 무언가와 이어지는 인터페이스의 역할을 한다. 

*/ 

const buildPage = () => {
  const page = new Page();
const customPage = new CustomPage(page);


const allPages = new Proxy(customPage, {
  get: function(target, property) {
    return target[property] || page[property];
  }
})
return allPages;
}

CustomPage.buildPage().login()

/*
선언형 --> 함수로 만들고 --> 그 함수를 static 메소드로 Custom Page 클래스 내부에 넣어서 코드 최소화
*/