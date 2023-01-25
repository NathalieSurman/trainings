// Code goes here!
import axios from "axios"
const form  =  document.querySelector("form")!
const addressInput = document.getElementById("address")! as  HTMLInputElement

const GOOGLE_API_KEY = "AIzaSyCAhk91Jn9lMR7lSUaRqZObV_1WSopIjwo"

type GoogleGeocodingResponse = {
    results: {geometry: { location: { lat:number; lng: number}}}[]
    status: "OK" | "ZERO_RESULTS"
}
//--We want to tell Ts that the google exist
    declare var google: any

//--We want a function for the event listener --//
function searchAddressHandler(event: Event) {
    event.preventDefault()
    const enteredAddress = addressInput.value

    //-- We want to use the Google Maps API, search google geocoding api(This is how to find it with google)--//

    //-- you have to install axios first npm install --save axios ---//
    //NOTE: We want the enter string to be a URL so we use a build in function call encodeURI() ---//
    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)

    .then(response =>{
        //--If the status is not ok we want a error msg --//
        if (response.data.status !== "OK"){
            throw new Error("Could not find location")
        }
        // console.log(response);
        const coordinates = response.data.results[0].geometry.location
        //--NOTE: you need to install npm install --save-dev @types/google.maps so you can use the new google.maps
//--NOTE: we got this function here ---> https://developers.google.com/maps/documentation/javascript/overview ---//
        const map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: 16
        });
//--NOTE: we got this function here ---> https://developers.google.com/maps/documentation/javascript/adding-a-google-map --//
        new google.maps.Marker({ position: coordinates,map: map,
        });
        
    })
    .catch(err => {
        alert(err.message)
        console.log(err);
        
    })

}

form.addEventListener("submit", searchAddressHandler)