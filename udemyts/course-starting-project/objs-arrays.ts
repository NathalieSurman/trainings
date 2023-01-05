// const person:{
//     //--This is a way to make the object more specific called object types--//
//     name: string;
//     age: number
// } = {
//     name: "Jane joe",
//     age:30
// }

//-- BUT this is a better way of writing it --//

enum Role {ADMIN, READ_ONLY, AUTHOR}// Enum => assigns labels to numbers in Ts
const person = {
    name: "Jane joe",
    age:30,
    hobbies: ["food", "fun things"],
    // role: [2, "someone"] // you can only have 2 elements in a Tuple a string and a number
    // //==Tuple is a Fixed- length array in Ts==//
    role2: Role.ADMIN
}
//-- this is another way to make an array of strings in Ts--//
let test : string[]
test = ["test2", "test2"]

console.log(person.name);
if(person.role2 === Role.ADMIN){
    console.log("is admin");
}


