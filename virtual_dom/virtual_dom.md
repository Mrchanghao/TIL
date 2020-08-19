# virtual dom

react는 화면에 렌더링 되는 성능을 빠르게 하기 위해 브라우저의 메모리에 Tree구조로 이루어진 버추얼돔을 저장한다. 

버츄얼돔은 이전의 돔구조와 변경될 돔구조를 비교(Diff algorithm)하여 바뀐 부분만을 실제 Dom에 반영하여 브라우저의 렌더링 과정과 비용을 최소화 한다
이 버츄얼 돔은 재조정(Reconciliation) 과정을 통해 다시 생성하게 된다. 변경이 일어났을 때 각각의 버츄얼 돔의 엘리먼트, 컴포넌트를 비교하여 리렌더링하고 이를 자식노드까지 반복한다. 

## 비교하는 Element 가 다른경우 div -> section
1. 이전 버츄얼 돔을 제거 (componentWillUnmount, useEffect clean-up) 
2. 모든 자식들도 모두 제거되고 재생성 된다.


## 비교하는 Element 와 Component가 동일한 경우 div -> div 
1. 버츄얼 돔 의 속성을 수정한 뒤, 자식들의 노드를 비교한다. (componentWillUpdate, useEffect diff)
2. 자식 노드들은 key를 가질 수 있는데 이전과 변경되는 key를 비교한다. 
3. key과 없으면 자식 노드를 삭제하고 key가 추가 됬으면 새로 자식노드를 생성
4. key 가 같으면 비교를 진행 

## 리렌더링 줄이기 
1. 부모 컴포넌트가 렌더링 되서 자식 비교 
2. ```props``` 변경
3. ```state``` 변경
4. ```forceUpdate``` 호출
 
부모가 다시 렌더링 되지만 자식의 props가 변경 되지 않는다면 리렌더링을 할 필요가 없다. --> Memozation(동일한 입력 발생 시 동일한 결과를 빠르게 반환)

Class 컴포넌트에서는 ```shouldComponentUpdate``` 사용 (<b>이전 props, 이전 state</b> 와 <b>다음 props, 다음 state</b>)비교하여 리렌더링 여부를 결정 

## 함수형 컴포넌트 (React.memo)
props 변경시에 비교하여 리렌더링 여부를 결정한다. 

## 주의 사항 
props로 전달하는 객체나 함수는 참조값을 전달한다. 때문에 참조값이 변경되면 리렌더링이 일어난다. 

```jsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
return (
  <Header onToggleMenu={() => setState(!isMenuOpen)}>
    open
  <Header>
)
```

onToggleMenu에게 인라인으로 전달하는 함수는 렌더링 시점에 생성한다. state변경 시에 리렌더링이 발생하면 onToggleMenu에 새로운 함수가 생성되어 props로 전달 된다. 
즉, 메모자이션 한 의미가 사라진다. 

## Hooks memorization

### useCallback
함수와 비교 배열을 전달받아 함수를 반환하는 hook, 비교하는 배열의 값이 변경되었을 때에만 새로운 함수를 리턴한다.


```jsx
const [isMenuOpen, setIsMenuOpen] = useState(false);

const onToggleMenuFunc = useCallback(() => {
  setIsMenuOpen(!isMenuOpen);
}, [isMenuOpen]);

return (
  <Header onToggleMenu={() => setState(!isMenuOpen)}>
    open
  <Header>
  // 아래 컴포넌트에서 성능이 향상 된다. 
  <Header onToggleMenu={onToggleMenuFunc}>
    open
  <Header>
)
```

### useMemo
함수와 비교 배열을 전달받아 값을 반환하는 hook, 비교하는 배열의 값이 변경되었을 때에만 새로운 값을 리턴한다.

## 성능 측정하기 Profile API
React Profiler 를 사용하면, mount update시점, 렌더링 된 시간 등을 측정할 수 있다.

```jsx
import React, { Profiler } from "react"
import { unstable_trace as trace } from "scheduler/tracing";
function Render() {
  const [value, setValue] = React.useState('')
  const onChange = useCallback((e => {
    trace('updated', performance.now(), () => {
      setValue(event.target.value)
    })
  }, []);
  return (<div>
    <React.StrictMode>
      <Profiler id="Render" onRender={onRenderCallback}>
        <input onChange={onChange} value={value} />
        {value}
      </Profiler>
    </React.StrictMode>
  </div>);
  function onRenderCallback(
    id,
    phase, // mount | update
    actualDuration, // 렌더링 시간
    baseDuration, // 전체 서브트리를 렌더링하는데 걸린 시간
    startTime, // 렌더링을 시작 시간
    commitTime, // 업데이트요청 시간
    interactions // trace set
  ) {
   //...
  }

```

참고글 아니 거의.... 베낌... ㅠㅠ 

감사의 인사 드림 
[medium_박성룡님글](https://medium.com/@pks2974/react-%EC%9D%98-%EC%84%B1%EB%8A%A5%EC%9D%84-%EC%A1%B0%EA%B8%88-%EC%9D%B4%EB%9D%BC%EB%8F%84-%EC%98%AC%EB%A0%A4%EB%B3%B4%EC%9E%90-performance-optimize-f1a51b8c406c)