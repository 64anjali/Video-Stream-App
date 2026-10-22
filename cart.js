
let allMovies = [];
const moviesContainer = document.getElementById("movies-container");

async function getMoviesData() {
    try {
        const response = await fetch("http://localhost:3000/cart");
        allMovies = await response.json();
        displayMovies(allMovies);
    } catch (err) {
        console.log("ERROR:", err);
    }
}

async function removeFromCart(id){
     try {
        await fetch(`http://localhost:3000/cart/${id}`,{
            method:"DELETE"
        });
        alert("Movie removed from cart");
        getMoviesData()
    } catch (err) {
        console.log(err);
    }
}


function displayMovies(movies) {
    if (!moviesContainer) {
        console.log("Movies container is missing");
        return;
    }
    moviesContainer.innerHTML = "";

    if (!movies || movies.length == 0) {
        moviesContainer.innerHTML = "<p>No movies found</p>";
    }
    movies?.forEach((movie => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
        <div class=movie-poster>
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster-img">
        </div>
        <div class="movie-info">
           <div class="movie-title">${movie.title}</div>
            <div class="movie-year">${movie.year}</div>
             <div class="movie-title">${movie.Category}</div>
             <div class="movie-rating">${movie.rating}⭐</div>
             <div class="movie-buttons">
             <button class="btn btn-delete">Delete
             </button>
             </div>
        </div>
        `
        let removeBtn=card.querySelector(".btn-delete");
        removeBtn.addEventListener("click",()=>{
            removeFromCart(movie.id)
        })
        moviesContainer.appendChild(card);
    }));
}

getMoviesData()
