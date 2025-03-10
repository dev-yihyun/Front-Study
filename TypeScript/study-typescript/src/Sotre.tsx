import React from "react";
import { Address, Resturant } from "./model/resturant";

interface OwnProps {
    info: Resturant;
    changeAddress(address: Address): void;
    //함수명(매개변수:타입):함수 리턴의 타입
}

const Store: React.FC<OwnProps> = ({ info }) => {
    return (
        <div>
            Store
            <p>{info.name}</p>
        </div>
    );
};

export default Store;
