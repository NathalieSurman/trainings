// Code goes here!

//class field
class Department {
    // private readonly id: string ---> this means "readonly" that it won't change
    // name: string
    //-- you use private when you work in a team and want a clean code --//
    private employees: string[] = []


    //-- This part is a function
    //-- This is a short cut to make the code smaller private id: string, public name: string---//
    constructor(private id: string, public name: string){
        // this.name = n
    }
    //-- Here are methods you can name it
    
    describe(){
        console.log(`Department (${this.id}): ${this.name}`)// --> you have to use this. to get something inside the class when you use a method
        
    }

    addEmployees(employee: string){
        this.employees.push(employee)
    }

    printEmployeeInformation(){
        console.log(this.employees.length);
        console.log(this.employees);
        
        
    }
}

//-- Now the construction is being called here in the new Department("Accounting")---//
const accounting = new Department("f3","Accounting")

accounting.describe()

accounting.addEmployees("Jane")
accounting.addEmployees("Zuzu")
accounting.printEmployeeInformation()