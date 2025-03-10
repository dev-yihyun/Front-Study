// number
// string
// boolean
// null
// undefined
// any : 이것도 저것도 아닌 모든 타입,어떤 타입이든 될 수 있는, 즉 타입을 명시적으로 지정하지 않은 값

let a: number = 3;
a = 4;
let b: string = "name";
let c: any = 5;

c = "test";
// any는 권장하지 않음
let d: number | string = "ㅁㄴㅇㄻㄴ"; // 두 가지 타입을 설정
d = 30;
// d=null : 타입오류
let e: string[] = ["a", "b", "c"];
// e.push(3) : type error
e.push("d");

function addNumber(a: number, b: number): number {
    //a를 number로 받고,b를 number로 받고 리턴을 number로 한다.
    return a + b;
}
addNumber(3, 7);
// addNumber("3", 4);
