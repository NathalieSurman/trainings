// ==> This is used in Ts it is a Aliases/Custom type but only use names that isn't used in Js or Ts like Date
//-- Type Aliases/Custom can be used to "create" your own types. You're not limited to storing union types though -
//- you can aslo provide an alias to a (possibly complex) object type. --//

// EXAMPLE
// type User = { name: string; age: number }
// const ul: User = { name: Jane; age: 18 } ---> this works
type Combinable = number | string 
type ConversionDescriptor = "as-number" | "as-text"


// -- In Ts you can put two type in a union types ----/
//-- In Ts Literal type is "as-number" | "as-text" they can been used with Union types ---
function combine(input1:  Combinable, input2:  Combinable, resultConversion: ConversionDescriptor) {

    let result
    // -- We do this bec you can't do just input1 + input2 ---//
    //-- This is how we use Union types to be more flexible --//
    if(typeof input1 === "number" && typeof input2 === "number" || resultConversion == "as-number"){
        result = +input1 + +input2
    } else{
        result = input1.toString() + input2.toString()
    }
    return result

    //--This is another way--//
    // if(resultConversion == "as-number"){
    //     return +result
    // } else{
    //     return result.toString()
    // }
   
}

const combinedAges = combine(30, 13, "as-number")
console.log(combinedAges);

//-- Ts literal types--
const combinedStringAge = combine("30", "13", "as-number")
console.log(combinedStringAge);


const combinedNames = combine("Bob", "Tom", "as-text")
console.log(combinedNames);
