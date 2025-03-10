// let data = {
//     name: "누나네 식당",
//     category: "western",
//     address: {
//         city: "incheoi",
//         detail: "somewhere",
//         zipCode: 1234,
//     },
//     menu: [
//         { name: "rose pasta", price: 2000, category: "PASTA" },
//         { name: "garlic steak", price: 3000, category: "STEAK" },
//     ],
// };

/*
개발자 스스로 타입을 만들 수 있다.
<타입을 만드는 방법>
1. interface
2. type

차이점 : 사용할 수 있는 메서드가 다르다.신텍스가 다르다.


*/
// 내가 만든 타입
export type Resturant = {
    name: string;
    category: string;
    address: Address;
    menu: Menu[]; //객체 배열
};
export type Address = {
    city: string;
    detail: string;
    zipCode: number;
};
export type Menu = {
    name: string;
    price: number;
    category: string;
};

// extends : 타입을 확장시킨다.
// Omit : 타입 빼고
// Pick : 특정 타입만

export type AddressWithoutZip = Omit<Address, "zipcode">; // Address타입에 zipcode를 뺀 타입
export type ResturantOnlyCategory = Pick<Resturant, "category">;
// Resturant타입에서 category만 원함

/*
API 구조
{
    data:[],
    totalPage:number,
    page:number
}
API는 이렇게 추가적인 정보가 같이 들어온다.
이것도 타입으로 만들어 줄 수 있다.
응답값
*/
export type ApiResponse<T> = {
    data: T[];
    totalPage: number;
    page: number;
};

export type ResturantResponse = ApiResponse<Resturant>;
export type MenuResponse = ApiResponse<Menu>;
