import "./Flag.css";
import { useState, useEffect, useRef } from "react";
import jData from "./assets/flag.json";

function Flag() {

    const [count, setCount] = useState(0);
    const [num, setNum] = useState(0);
    const [inputStr, setInputStr] = useState('');
    const inputRef = useRef(null);
    const [correct, setConrrect] = useState(false);

    function onSubmit() {
        console.log('버튼 클릭했다 : '+ inputStr);
        inputRef.current.value = null;
        if(inputStr === jData.flag[num]) {
            setConrrect(true);
        } else {
            setConrrect(false);
        }
        setCount(count + 1);
    }

    useEffect( () => {
        const random = Math.floor(Math.random() * 10);
        setNum(random);
        console.log('useEffect 호출 : ' + num);
    }, [count]);

    function keyDown(e) {
        if(e.key === 'Enter') {
            onSubmit();
        }
    }

    return (
        <div className="container">
            <div><h2>국기 게임</h2></div>
            <div><img src={"/img/" + String(num) + ".png"} /></div>
            <div>{count > 0 ? (correct ? '정답' : '오답') : '-' }</div>
            <div>횟수 : {count}</div>
            <div>
                <input placeholder="정답을 입력하세요"
                    onChange={e => setInputStr(e.target.value)}
                    onKeyDown={keyDown}
                    ref={inputRef}
                />
                <button className="btn" onClick={() => onSubmit()}>확인</button>
            </div>
        </div>
    )
}

export default Flag