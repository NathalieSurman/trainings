// Code goes here!

//This is all Generic types
// const names: Array <string> = [] //---> This is a Generic type it is like this--> const names = ["Jane", "Rose"]

// const promise: Promise<number> = new Promise((resolve, reject) =>{
//     setTimeout(() => {
//         resolve(12)
//     }, 2000)
// })

//--Here we are doing a function with Generic types----//

//-- This merge<T, U> is telling Ts that we want any type but  we don't know what it will be sting or number --//
//--This merge<T extends object, U extends object> put constraints on our Generic types to be Objects or strings | numbers ---//
    function merge<T extends object, U extends object>(objA: T, objB: U) {
        return Object.assign(objA, objB);
    }
    
    const mergedObj = merge({ name: 'Rose', hobbies: ['Sports'] }, { age: 45 });
    console.log(mergedObj);


    interface Lengthy {
        length: number
    }

    function countAndDescribe<T extends Lengthy>(element: T) {
        let descriptionText = "Got no Value."
        if(element.length === 1){
            descriptionText = "Got 1 element"
        } else if (element.length > 1){
            descriptionText = "Got " + element.length + " elements"
        }
        return [element, descriptionText]
    }
    console.log(countAndDescribe(["Eating", " Cooking", "Drinking"]));

    //--This is so we tell Ts to do it in the right order---//
    function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
        return "Value: " + obj[key]
    }
     extractAndConvert({name: "Rose"}, "name")


     //=== Here is a Generic Class =====//
     class DataStorage <T extends string | number | boolean>{
        private data: T[] = []

        addItem(item: T) {
            this.data.push(item)
        }

        removeItem(item: T) {
            this.data.splice(this.data.indexOf(item), 1)
        }

        getItems(){
            return [...this.data]
        }

        }

        const textStorage = new DataStorage<string>()
        textStorage.addItem("Rose")
        textStorage.addItem("Lilly")
        textStorage.addItem("Bobby")
        textStorage.removeItem("Lilly")
        console.log(textStorage.getItems())
