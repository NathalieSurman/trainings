// -- The Unknown type in Ts--//

let userInput : unknown //---> when we don't know what the user will put
let userName: string

userInput = 4
userInput = " Jane"
//-- We use this when you want to assign an unknown value to a fixed type (string, number, etc)---//
if ( typeof userInput === "string"){
     userName = userInput
}

//=== The Never type in Ts ===//

// Note: this function returns nothing like void
//-- This is made to break your applications in Ts--//
function generateError(message: string, code: number): never{
    throw { message: message, errorCode: code}
}
generateError("An error occurred!", 500)