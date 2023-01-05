// Classes

//class field
class Department {
    // private readonly id: string ---> this means "readonly" that it won't change
    // name: string
    //-- you use private when you work in a team and want a clean code --//
    // private employees: string[] = []
    //--- protected is like private but you can have access to it in another classes---//
    protected employees: string[] = []


    //-- This part is a function
    //-- This is a short cut to make the code smaller private id: string, public name: string---//
    constructor(private id: string, public name: string){
        // this.name = n
    }
    //-- Here are methods you can name it---//

    //--NOTE Static method can't be access with the this. you would have to write Department.createEmployee if you want--
    //-- tp access it in other places like in the constructor ---//
    static createEmployee(name: string){
        return {name: name}
    }
    
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

//====== Here we are Inheriting the class Department ======//
//--Inheritance allows you to share some common functionality and yet create more specialized blueprints.--//
class ITDepartment extends Department{

constructor(id: string, private reports: string[]){
//--In a class that inherent from another class you have to use super()---/
    super(id, "IT")
}
addEmployee(name: string){
    if (name === "Max"){
        return
    }
    this.employees.push(name)
}
addReport(text: string){
    this.reports.push(text)
}

printReports(){
    console.log(this.reports);
    
}
}

//-- Now the construction is being called here in the new Department("Accounting")---//
const accounting = new Department("f3","Accounting")
// const accounting = new ITDepartment("d3",["testing"])

accounting.describe()

accounting.addEmployees("Jane")
accounting.addEmployees("Zuzu")
accounting.printEmployeeInformation()

//-- This is a Static properties---//
const employee1 = Department.createEmployee("Bob")
console.log(employee1);


const accountingDpt = new ITDepartment("d3",["testing"])
accountingDpt.addReport("Something went wrong... testing")
accountingDpt.printReports()
accountingDpt.addEmployee("Max")
accountingDpt.addEmployee("Jane")
accountingDpt.printEmployeeInformation()