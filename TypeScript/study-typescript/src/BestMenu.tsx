import React from "react";
import { Menu } from "./model/resturant";

// interface OwnProps extends Menu {
//     showBestMenu(name: string): string;
// }
// 타입에 추가
// type OwnProps = Menu & {
//     showBestMenu(name: string): string;
// };

interface WithoutOwnProps extends Omit<Menu, "price"> {
    showBestMenu(name: string): string;
}
// price만 뺀 타입
const BestMenu: React.FC<WithoutOwnProps> = ({ name, category, showBestMenu }) => {
    return (
        <div>
            BestMenu
            <p>{name}</p>
            <p>{category}</p>
        </div>
    );
};

export default BestMenu;
