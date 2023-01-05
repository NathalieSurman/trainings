//-- We are telling Ts that both n1 and n2 should be number types or boolean or string--//
//-- This is the core data types in action in Ts --//
//--- OTHER CORE TYPES are Tuple, Enum and Any in Ts---//
function add(n1: number, n2: number, showResult: boolean, phrase: string){
    //-- We want the numbers in a variable first so it don't turn into a string in the if condition in Ts --//
    const result = n1 + n2
    if(showResult){
        console.log(phrase + result);
        
    } else{
        return result
    }
    
}

const number1 = 5
const number2 = 10
const printResult = true
const resultPhrase = "The result is:"

add(number1, number2, printResult, resultPhrase)

