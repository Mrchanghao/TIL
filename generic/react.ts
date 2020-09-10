export {};

function identity<T extends number | string>(p1: T): T{
  return p1;
}

// 리액트 같은 라이브러리의 속성값 전체는 객체 타입만 허용된다? 
// extends 키워드로 타입을 제한
// A extends B --> A가 B에 할당  가능해야 한다
identity(1);

identity('p2')

interface Person {
  name: string;
  age: number;
}

interface Korean extends Person {
  liveInSeoul: boolean;
}
// keyof 모든 속성이름을 나열한 것d 즉 K는 name 또는 age 여야 한다
function swapProperty<T extends Person, K extends keyof Person>(
  p1: T,
  p2: T,
  key: K,
): void {
  const temp = p1[key];
  p1[key] = p2[key];
  p2[key] = temp;
}
// K extends keyof Person 아래 코드와 같다
// type T1 = keyof Person;