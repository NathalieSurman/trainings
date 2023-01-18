// Code goes here!

//--Validation logic ---//
//--NOTE: this also needs to be on top of the class and bind when using it ---//

interface Validatable {
    //-- These are the properties we want to support ---//
    value: string | number
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
}

//-- THis validate(validatableInput: Validatable) gets an object which has the structure--//
function validate(validatableInput: Validatable){
    let isValid = true
    //-- We want to check if it is empty--//
    if (validatableInput.required){
        isValid = isValid && validatableInput.value.toString().trim().length !== 0
    }
    //--This checks if we do have a string when the minlength is set
    if (validatableInput.minLength != null && typeof validatableInput.value === "string"){
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength
    }

    if (validatableInput.maxLength != null && typeof validatableInput.value === "string"){
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength
    }

    if (validatableInput.min != null && typeof validatableInput.value === "number"){
        isValid = isValid && validatableInput.value >= validatableInput.min
    }
    if (validatableInput.max != null && typeof validatableInput.value === "number"){
        isValid = isValid && validatableInput.value <= validatableInput.max
    }
    return isValid
}


//--NOTE; When we use Bind it needs to be on top of the class you want to use it in ---/

//---This is the autobind decorator---//
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    //--We want to store the method we originally defined--//
    const originalMethod = descriptor.value

    //--We want to create a adjusted descriptor here ---//
    const adjDescriptor: PropertyDescriptor = {
        //--We set configurable to true so that we can always change it--//
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    return adjDescriptor

}

//-- Project list Class
class ProjectList{
    //--This is a field ---//
    templateElement: HTMLTemplateElement
    hostElement: HTMLDivElement
    element: HTMLElement

    constructor(private type: "active" | "finished") {
        this.templateElement = document.getElementById("project-list")! as HTMLTemplateElement //--This is type casing
        this.hostElement = document.getElementById("app")! as HTMLDivElement
        //--This imports our content--//
        const importedNode = document.importNode(this.templateElement.content, true)

        //-- Remember that this.element is the Section element
        this.element = importedNode.firstElementChild as HTMLElement
        this.element.id = `${this.type} -projects`
        this.attach()
        this.renderContent()
    }

    //---Method types here --- //

    //--Here we want to fill the template that has nothing in the HTML ---//
    private renderContent() {
        //--We want to give the ul, h2 a Id so we go inside the -project-list template---//
        const listId = `${this.type}-project-list`
        this.element.querySelector("ul")!.id = listId
        this.element.querySelector("h2")!.textContent = this.type.toLocaleUpperCase() + " MINI PROJECT"
    }

    //--This renders to the Dom ---//
    private attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element)
    }
}


//--This is the ProjectInput Class--//
class  ProjectInput {
    //--This is a field ---//
    templateElement: HTMLTemplateElement
    hostElement: HTMLDivElement
    element: HTMLFormElement
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor(){
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement //--This is type casing
        this.hostElement = document.getElementById("app")! as HTMLDivElement

        const importedNode = document.importNode(this.templateElement.content, true)

        //-- Remember that this.element is the Form element
        this.element = importedNode.firstElementChild as HTMLFormElement

        //--This will render the element ID (for the styling)---//
        this.element.id = "user-input"

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement

        //-- We put it here so that this code  will execute ---//
        this.configure()
        this.attach()
    }

    //-- This is a method that returns a tuple ---//
    //--This is also how you validate---//
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable ={
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validatable ={
            value: enteredDescription,
          minLength: 5
        }

        const peopleValidatable: Validatable ={
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

//--We want to check if at least one of them is  false it will show the alert error
        if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
        ) {
            alert("Invalid, please try again with a better input")
        } else{
            return [enteredTitle, enteredDescription, +enteredPeople]
        }

    }


    //--- Here we want a clear method that will clear the inputs once the form is submitted ----//
    private clearInputs () {
        this.titleInputElement.value = ""
        this.descriptionInputElement.value = ""
        this.peopleInputElement.value = ""
    }

    //--- This is a private method Note: When it is private you can have access to it outside the class---//
    @autobind
    private submitHandler(event: Event){
        event.preventDefault()
        const userInput = this.gatherUserInput()
        //--Here we want to check the tuple(tuple are Arrays so this is how you check with Tuples)
        if (Array.isArray(userInput)){
            const [title, des, people] = userInput
            console.log(title, des, people);
            this.clearInputs()
        }

    }

    private configure (){
        this.element.addEventListener("submit", this.submitHandler)
    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element)
    }
}

//-- This is how we will see the form on the website---//
const prjInput = new ProjectInput()

//--This is how we see out list selection ----//
const activePrjList = new ProjectList("active")
const finishPrjList = new ProjectList("finished")