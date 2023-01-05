// Interface

//=== We need a interface bec interface can be used to describe the structure of an object which is clearer ===//
// Note also you can use a class  with interface //

// type AddFn = ( a: number, b: number) => number
//THIS is another way using interface
interface AddFn {
    (a: number, b: number): number
}

let add: AddFn
add = ( n1:number, n2: number) => {
 return n1 + n2
}

interface Named{
    readonly name: string
    //--The ? at the end tells Ts this is optional--//
    outputName?: string
}

//-- With interface you can inherent more than one  ex: interface Greetable extends Named, AntherThing--//
interface Greetable extends Named{
    //-- you can also add the readonly modifier BUT NOT private or public
    // readonly name: string
    age: number

    //-- We can add a method---//
    greet(phrase: string): void
}

class Person implements Greetable {
    name: string
    age = 9

    constructor(n:string){
        this.name = n
    }

    greet(phrase: string) {
        console.log(phrase + " " + this.name);
    }
}

let user1: Greetable

user1 = new Person("Jane")

user1.greet("Hi there - I am ")