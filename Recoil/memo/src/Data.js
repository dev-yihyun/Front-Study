import {atom} from "recoil";

export const fontSizeState = atom(
  {
    key: 'fontSizeState',
    default: 14,
  }
 
);

export const valueState = atom({
  key:'value',
  default:0
})

export const todoListState = atom({
  key:'todoListState',
  default:[
    {
      id:1,
      text:"할일1",
      done:false,
    },
    {
      id:2,
      text:"할일2",
      done:false,
    },
    {
      id:3,
      text:"할일3",
      done:false,
    }
  ],
});

/*
atom은 하나의 객체만 인자로 받는다.
두 개의 객체를받을 수 없다.
그러므로 각 상태 관리를 하려면 atom을 각각 따로 선언해야한다.
export const fontSizeState = atom(
  {
    key: 'fontSizeState',
    default: 14,
  }
 
);

export const valueState = atom({
  key:'value',
  default:0
})

만약 atom으로 여러 값을 저장하려면 
객체나 배열 같은 복합데이터를 사용할 수 있다.
export const appState = atom({
  key: 'appState',
  default: {
    fontSize: 14,
    value: 0,
  },
});

appstate에서는 fontSize value를 모두 포함한 상태 객체를 관리한다.
컴포넌트에서 이 상태를 사용하거나 업데이트 할 때는 
해당 객체의 속성 값을 접근한거나 수정하면 된다.

const [state, setState] = useRecoilState(appState);

// fontSize 변경
setState((prevState) => ({
  ...prevState,
  fontSize: prevState.fontSize + 2,
}));

// value 변경
setState((prevState) => ({
  ...prevState,
  value: prevState.value + 1,
}));

*/