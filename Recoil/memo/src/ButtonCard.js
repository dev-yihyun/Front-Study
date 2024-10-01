import React from "react";
import { fontSizeState,valueState } from "./Data";
import {useRecoilState} from'recoil';
function ButtonCard() {
    const [fontSize, setFontSize] = useRecoilState(fontSizeState);
    const [value,setValue] = useRecoilState(valueState);
    const onSizeUp = () =>{
      setFontSize((size) => size + 1);
    }
    const onValueUp = () =>{
      setValue((value)=>value+1);
    }
    const onValueDown = ()=>{
      setValue((value)=>value-1);
    }
    return (
      <>
      
      <button onClick={onSizeUp}>
        Click to Enlarge
      </button>
      <p style={{fontSize}}>폰트 크기</p>
      <hr/>
      <button onClick={onValueUp}>
        +
      </button>
      <p>{value}</p>
      <button onClick={onValueDown}>
        -
      </button>
      <hr/>
      </>
      
    );
}

export default ButtonCard;