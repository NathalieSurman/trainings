function add(n1: number, n2: number){
    return n1 + n2

}

//--Void type does not return anything--//
function printResult(num: number){
    console.log("Result: " + num);
    
}

//-- This a Function type/Callback --
function addAndHandle(n1: number, n2: number, cb: (num: number) => void){
    const result = n1 + n2 
    cb(result)
}

printResult(add(5, 12))

// we want combineValues to be a Function 
let combineValues: Function
combineValues = add // ---> this is the function we want to happen
console.log(combineValues(8, 3));


//--- This is the Callback function ---//
addAndHandle(5, 10, (result) => {
    console.log(result);
    
})