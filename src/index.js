// Your code here
document.addEventListener("DOMContentLoaded",()=>{ // allows the content to load fully.
const baseURL ="http://localhost:3000/films"  // variable that stores the URL to the films details
// variables that store the selectors of the various elements we want to manipulate in the DOM
const poster = document.querySelector("#poster")
const sideMenuTitles = document.querySelector("#films")
const runTime = document.querySelector("#runtime")
const filmInfo=document.querySelector("#film-info")
const showTime = document.querySelector("#showtime")
const ticketNum = document.querySelector("#ticket-num")
const buyTicket = document.querySelector("#buy-ticket")
const movieTitle = document.querySelector("#title")
let movieDetail ;
 fetch(baseURL) // fetches the elements from the server
.then(res=> res.json())  //checks the first promise and converts response to a json object
.then(movieDetails=>{ 
       // checks the second promise and renders the data for use.
sideMenuTitles.textContent = ""     // Removes the words "Movie titles will go here"  and now becomes an empty string
movieDetails.forEach((movieDetail) => {
const li = document.createElement("li")  // it creates a new list element where each movie will be shown  
li.textContent = movieDetail.title // specifies what should be displayed in the li element
li.classList.add("film","item") // adds the css elements to style the titles on the side menu on the left.
 li.id = `movieID ${movieDetail.id} ` // creates a unique identifier  for each movie.
 sideMenuTitles.appendChild(li)    // appends the li element to the HTML which is reflected on the DOM.
 li.addEventListener("click",()=>dispMovieDetails(movieDetail)) // an event listener that listens for when 
 // the movie title is clicked
})

}

    )
    buyTicket.addEventListener("click",()=>purchasesTicket(movieDetail))  // listens for a click event on the buy button

    function dispMovieDetails(movieDetail){
movieTitle.textContent = " "    // clears the words '[MOVIE TITLE]'and replaces with an actual movie title
      movieTitle.textContent =movieDetail.title 
runTime.textContent = " " // clears the words [RUNTIME] and replaces with the actual runtime
      runTime.textContent = movieDetail.runtime + " minutes"
filmInfo.textContent = " " //clears the words [INSERT MOVIE DESCRIPTION HERE] and replaces with the movie description
filmInfo.textContent = movieDetail.description       
showTime.textContent = " " // clears the words [SHOWTIME] and replaces with the actual runtime
showTime.textContent = movieDetail.showtime
ticketNum.textContent = " "           // clears the [X] and replaces with actual ticket numbers
ticketNum.textContent = movieDetail.capacity - movieDetail.tickets_sold
poster.src  = movieDetail.poster  

    

}

function purchasesTicket(ticketCount){ // Is a function that displays sold out when the tickets are
                                       // sold out  

     
    if (  ticketCount === 0 ){
    ticketNum.textContent = "Sold Out"
    buyTicket.disabled = true
    }else{ticketNum.textContent =(ticketCount) - 1
    fetch (`http://localhost:3000/films/${movieDetail.id}`,{ // patch request that updates the server.
    method : "PATCH" ,
    headers:{
            "Content-Type":"application/json"
        
        },
    body : JSON.stringify({ tickets_sold :  movieDetail.tickets_sold +1   
                                             // adds a  ticket to the tickets_sold when the request is made.
        })
        
        })   
    .then(res=>res.json())  // checks for the first promise
    .then(ticketsUpdate=> {    // checks for the second promise and renders the data for use
    console.log( `Ticket purchase is successful ${ticketsUpdate}`)
    
    })
    .catch(error=>{    // displays the other option if the promise was rejected which is an error
    console.log ("Error occurred during updating tickets", error)    
    }) 
}
}







}) 
 

