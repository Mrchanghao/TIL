export {}

interface Person {
  name: string;
  age: number;
}


interface PersonOptional {
  name? : string;
  age?: number;
}

interface PersonReadonly {
  readonly name: string;
  readonly age: number;
}

type T1 = { [K in 'prop1' | 'prop2' ]: boolean }

// MaekBoolean 은 어떤 interface 타입의 속성들을 정해진 속성으로 변경하여 지정할 수 있다. 
type MakeBoolean<T> = { [P in keyof T]?: boolean };

const pMap: MakeBoolean<PersonOptional> = {}

pMap.name = true;
pMap.age = false;


type ReadOnlyPerson<T> = { readonly [P in keyof T ]: T[P] };

type Partial<T> = { [P in keyof T]?: T[P] }; 

type T2 = ReadOnlyPerson<Person>;
type T3 = Partial<Person> // 선택 속성으로 만든다.


type Pick<T, K extends keyof T> = { [P in K]: T[P]};
// 두가지 인터페이스 혹은 객체를 타입으로 받는다 --> 먼저 T와 K --> mapped type으로 keyof 키워드로 나열된 속성들로 타입을 정의한다
// 그 속성들을 T에 적용하여 타입을 만든다 
interface PickPerson {
  name: string;
  age: number;
  liveInSeoul: boolean;
}

type Korean = Pick<PickPerson, 'name' | 'liveInSeoul'>

type Record<K extends string, T> = {[P in K]: T};

type StringPerson = Record<'p1' | 'p2', PickPerson> // p1 과 p2로 이루어진 인터페이스를 만들고 그 타입을 PickPerson으로 만든다

enum Fruit {
  Apple,
  Banna,
  Orange,
};

//enum 으로 속성 값들 정의 할 때 mapped 타입 정의 하자

const FRUIT_PRICE: {[key in Fruit ]: number} = {
  [Fruit.Apple]: 1000,
  [Fruit.Banna]: 1500,
  [Fruit.Orange]: 2000,
}