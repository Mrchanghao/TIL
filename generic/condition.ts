export {}

// T extends U ? X : Y

type IsStringType<T> = T extends string ? 'yes' : 'no';

// type T1 = IsStringType<number> // no 라는 타입

type T1 = number | string | never;

type Exclude<T, U> = T extends U ? never : T;

type T2 = Exclude<1 | 3 | 5 | 7, 1 | 5 | 9>;

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type T3 = ReturnType<() => string>; // string

function f1(s: string): number {
  return s.length;
};

type T4 = ReturnType<typeof f1>; // 함수의 값의 타입을 알기 위해 typeof 사용 --> number

// 인터페이스에서 지정한 속성을 제거
type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;
  // U는 인터페이스의 속성 이름 == 전체 T에 대해서 U를 제거한다
interface Pica {
  name: string;
  age: number;
  nation: string;
}

type Omit1 = Omit<Pica, 'nation' | 'age'>;

// 두가지 인터페이스를 받아서 두가지 인터페이스의 나열된 속성들을 제거하고 남은 속성들로 맵드 타입을 구성 후 U와 교집합
// --> T라는 인터페이스를 베이스로 U가 T를 덮어 쓴다
type Overwrite<T, U> = { [ P in Exclude<keyof T, keyof U> ]: T[P]} & U;

interface OverPerson {
  name: string;
  age: number;
}

type O1 = Overwrite<OverPerson, {seoul: number, livein: boolean}>

const p10: O1 = {
  age: 34,
  name: 'sfs',
  livein: true,
  seoul: 234,
}