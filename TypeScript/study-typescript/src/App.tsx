import { useState } from "react";
import "./App.css";
import BestMenu from "./BestMenu";
import { Address, Resturant } from "./model/resturant";
import Store from "./Sotre";

/*
함수에 들어가는 매서드도 타입을지정해주어야한다.
함수의 리턴값도 타입을 지정해주어야한다.

App 함수는 컴포넌트를 리턴하고있다.
:React.FC
-> 함수 컴포넌트를 타입을 지정해줄 수 있다.
*/

let data: Resturant = {
    name: "누나네 식당",
    category: "western",
    address: {
        city: "incheoi",
        detail: "somewhere",
        zipCode: 1234,
    },
    menu: [
        { name: "rose pasta", price: 2000, category: "PASTA" },
        { name: "garlic steak", price: 3000, category: "STEAK" },
    ],
};

const App: React.FC = () => {
    // <> : 제네릭
    // useState에도 타입을 명시할 수 있다.
    /*
    useState는 함수다.리액트라는 패키지에서 왔다.
    이 함수에 들어가는 타입이 뭔지 모른다.
    */
    const [myRestaurant, setMyResaurant] = useState<Resturant>(data);
    const changeAddress = (address: Address) => {
        setMyResaurant({ ...myRestaurant, address: address });
    };
    const showBestMenu = (name: string) => {
        return name;
    };

    return (
        <>
            <Store info={myRestaurant} changeAddress={changeAddress} />
            <BestMenu name="불고기피자" category="피자" showBestMenu={showBestMenu} />
        </>
    );
};

export default App;
