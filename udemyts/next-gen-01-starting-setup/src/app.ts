// Code goes here!

// const add = (a: number, b: number) => a + b

// console.log(add(5, 6));

//-- obj--//
const hobbies = ["eating", "cooking"]
const activeHobbies = ["Dancing", "Swimming"]
//-- In Ts we can use the spread operator ---//
activeHobbies.push(...hobbies)


const person = {
    name: "Jane",
    age: 23
}

const copiedPerson ={...person}


//---We can use Rest Parameters in Ts --//
//--- This will accept as many arguments as you give --//
const add = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) =>{
        return curResult + curValue
    }, 0)

}
const addNumbers = add(2, 5, 10, 6, 8)
console.log(addNumbers);
