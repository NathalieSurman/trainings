// Drag & Drop Interface
interface Draggable {
    //--We need to event listeners---
    dragStartHandler(event: DragEvent): void
    dragEndHandler(event: DragEvent): void
}

interface DragTarget {
    dragOvertHandler(event: DragEvent): void
    dropHandler(event: DragEvent): void
    dragLeaveHandler(event: DragEvent): void
    
}


// Project Type
enum ProjectStatus {
    Active,
    Finished
    }
    class Project {
        constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
        ) {}
    }

//--Here is a custom type which is just a function--//
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];
    //--We want it to listen when something changes or gets added
    addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
    }
}


//Project State Management
class ProjectState extends State<Project>{
    private projects: Project[] = []
    private static instance: ProjectState

    private constructor () {
        super()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState()
        return this.instance
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project( Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active)
        
        this.projects.push(newProject)
        this.updateListeners()

    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId)
        if (project && project.status !== newStatus) {
            project.status = newStatus
            this.updateListeners()
        }
    }

    private updateListeners() {
//--we want to loop over it--//
    for (const listenerFn of this.listeners) {
//-- We add the slice so it can retune a copy of the array and not the original array --//
    listenerFn(this.projects.slice())
        }
    }
}


const projectState = ProjectState.getInstance()

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

//--Component Base Class --//
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement
    hostElement: T
    element: U

    constructor ( templateId: string,  hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement //--This is type casing
        this.hostElement = document.getElementById(hostElementId)! as T

           //--This imports our content--//
        const importedNode = document.importNode(this.templateElement.content, true)

        //-- Remember that this.element is the Section element
        this.element = importedNode.firstElementChild as U
        //--We want to check if newElementId is a thing first to assign it --//
        if (newElementId) {
            this.element.id = newElementId
        }
        
        this.attach(insertAtStart)
    }

      //--This renders to the Dom ---//
    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element)
    }
    abstract configure(): void 
    abstract renderContent(): void
}

//-- Project Item class---///
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
    private project: Project

    get persons() {
        if(this.project.people ===1) {
            return "1 person"
        } else {
            return `${this.project.people} persons`
        }
    }

    constructor(hostId: string, project: Project){
        super("single-project", hostId, false, project.id)
        this.project = project

        this.configure()
        this.renderContent()
    }

    @autobind
    dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id)
    event.dataTransfer!.effectAllowed = "move"
    }
    dragEndHandler(_: DragEvent){
        console.log("DragEnd");
        
    }

    //--Methods---//
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler)
        this.element.addEventListener("dragend", this.dragEndHandler)
    }

    renderContent() {
        this.element.querySelector("h2")!.textContent = this.project.title
        this.element.querySelector("h3")!.textContent = this.persons + " assigned"
        this.element.querySelector("p")!.textContent = this.project.description
    }
}

//-- Project list Class NOTE: extends Component is call inheritance --//
class ProjectList extends Component<HTMLDivElement, HTMLElement > implements DragTarget{
    assignedProjects: Project[]

    constructor(private type: "active" | "finished") {
        super("project-list", "app", false, `${type} -projects`)
        this.assignedProjects = []
        this.configure()
        this.renderContent()
    }

    @autobind
    dragOvertHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault()
        const listEl = this.element.querySelector("ul")!
            listEl.classList.add("droppable")
        }
    }

    @autobind
    dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain')
    projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished)
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!
    listEl.classList.remove("droppable")
    }

    //---Method types here --- //
    //--NOTE: when the method is public it should be ABOVE PRIVATE ones --// 
    configure() {
        this.element.addEventListener("dragover", this.dragOvertHandler)
        this.element.addEventListener("dragleave", this.dragLeaveHandler)
        this.element.addEventListener("drop", this.dropHandler)



        projectState.addListener((projects: Project[]) =>{
            const relevantProjects = projects.filter(prj => {
                if(this.type === "active"){
                    return prj.status === ProjectStatus.Active
                }
            return prj.status === ProjectStatus.Finished
            } )
        this.assignedProjects = relevantProjects
        this.renderProjects()
        })
    }

    //--Here we want to fill the template that has nothing in the HTML ---//
        renderContent() {
        //--We want to give the ul, h2 a Id so we go inside the -project-list template---//
        const listId = `${this.type}-project-list`
        this.element.querySelector("ul")!.id = listId
        this.element.querySelector("h2")!.textContent = this.type.toLocaleUpperCase() + " EVENTS"
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement
        //--We do this so that it doesn't rerender that we wrote before--//
        listEl.innerHTML = ""
        //-- We want to render all the  projects we have--//
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul")!.id, prjItem)
        }
    }



}


//--This is the ProjectInput Class--//
class  ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    //--This is a field ---//
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor(){
        super("project-input", "app", true, "user-input")

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement

        //-- We put it here so that this code  will execute ---//
        this.configure()
    }

    //NOTE: when the method is public it should be ABOVE PRIVET ones --// 
    configure () {
        this.element.addEventListener("submit", this.submitHandler)
    }

    renderContent() {}
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

    //--- This is a private method Note: When it is private you can't have access to it outside the class---//
    @autobind
    private submitHandler(event: Event){
        event.preventDefault()
        const userInput = this.gatherUserInput()
        //--Here we want to check the tuple(tuple are Arrays so this is how you check with Tuples)
        if (Array.isArray(userInput)){
            const [title, des, people] = userInput
            projectState.addProject(title, des, people);
            this.clearInputs()
        }

    }
}

//-- This is how we will see the form on the website---//
const prjInput = new ProjectInput()

//--This is how we see out list selection ----//
const activePrjList = new ProjectList("active")
const finishPrjList = new ProjectList("finished")