// Code goes here!


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

        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0 ) {
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