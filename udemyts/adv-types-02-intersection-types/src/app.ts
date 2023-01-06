//-- Intersection types--//
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

//-- You could also use interface Example: interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
};

//--These are the union types (Combinable, Numeric and Universal)---//
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//====Type guard checks if a certain property or method exists before you try to use it ====//

function add(a: Combinable, b: Combinable){
  //We want to check if a or b are strings else just add the numbers 
  //--This is Called a type  guard bec it lets us to utilize the flexibility union types gives us and runs at run times ---//
  if (typeof a === "string"  || typeof b === "string"){
    return a.toString() + b.toString()
  } 
  return a +b 
}

type UnknownEmployee = Employee | Admin

//Note this is also type guard in the if parts
function printEmployeeInformation(emp: UnknownEmployee){
  console.log("Name: " + emp.name);
  //-- We check this since in Adim as privileges but not Employee so we want to check if this unknown employee as privileges--//
  if("privileges" in emp){
    console.log("Privileges: " + emp.privileges);
    
  }
  if("startDate" in emp){
    console.log("Start Date: " + emp.startDate);
    
  }
  
}

//-- Now we call an employee that we know is there ---//
// printEmployeeInformation(e1)
//-- We can also make it like this ---//
printEmployeeInformation({name: "Blu", startDate: new Date() })


class Car {
  //--This is a method--//
  drive(){
    console.log("It is driving ...");
    
  }
}

class Truck {

  //--These are methods--//
  drive(){
    console.log("It is driving a truck...");
    
  }

  loadCargo(amount: number){
    console.log("Loading cargo ..." + amount);
    
  }
}


//--This is the union type---//
type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle){
  vehicle.drive()
  // if ("loadCargo" in vehicle){
  //   vehicle.loadCargo(1000)
  // }
//---This is another way of doing this if help the type guard ---///
if (vehicle instanceof Truck){
  vehicle.loadCargo(1000)
}
}
useVehicle(v1)
useVehicle(v2)

interface Bird {
  type: "bird"
  flyingSpeed: number
}
  interface Horse{
    type: "horse"
    runningSpeed: number
  }

  type Animal = Bird | Horse

  function moveAnimal(animal: Animal){
    let speed
  switch(animal.type){
    case "bird":
      speed = animal.flyingSpeed
      break
      case "horse":
        speed =  animal.runningSpeed
  }
    console.log("Moving at speed: " + speed);
    
  }

  moveAnimal({type: "bird", flyingSpeed: 20})


//-- Type Casting--//
//---There are 2 ways of doing type casting --//
  // ---- Example 1: const userInputElement = <HTMLInputElement>document.getElementById("user-input")!
  const userInputElement = document.getElementById("user-input")! as HTMLInputElement //--> This is Example 2

userInputElement.value = " hey "


//===Index Properties
interface ErrorContainer {
  //-- This part is a Index properties---//
  [prop: string]: string
}

const errorBag: ErrorContainer = {
  //--Here we can add as many properties now that has a string ---//
  email: " not an valid email !",
  username: " Must start with a capital character"
}