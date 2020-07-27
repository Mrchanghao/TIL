# useClickAway

custom hook 인 useClickAway은 엘리먼트 외부의 클릭에 반응하고 이벤트가 감지 될때 호출된다. 

예를 들어 모달창에서 작업 중일 때 모달을 닫고자 하면 이 훅을 사용하여 모달 외부를 클릭하여 모달창을 닫으면 된다. 

```javascript
export default () => {
  const [modal, setModal] = useState(false);
  const clickRef = React.useRef('');

  useClickAway(clickRef, () => {
    setModal(false);
  });

  return (
    <div className='container'>
      <button onClick={() => setModal(true)}>show</button>
      {modal && <Modal 
        modal={modal}
        setModal={setModal}
        onClickOutside={onClickOutside}
      />}
    </div>
  )
}
// clickRef: element - hook에 바인드 되어 있는 돔엘리먼트 
```