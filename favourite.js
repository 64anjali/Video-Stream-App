const favouriteContainer=document.getElementById("favourite-container");

async function removeFromFavourite(id) {
    try {
        await fetch(`http://localhost:3000/favourites/${id}`, {
            method: "DELETE"
        });

        alert("Movie removed from favourites");

        getFavouriteMovies();

    } catch (error) {
        console.log("ERROR:", error);
    }
}


async function getFavouriteMovies(){
    try{
        const response = await fetch("http://localhost:3000/favourites");
        const favourites = await response.json();

        displayFavouriteMovies(favourites);

    }catch(error){
        console.log("ERROR:", error);
    }
}

function displayFavouriteMovies(favourites) {

    favouriteContainer.innerHTML = "";

    if(!favourites || favourites.length === 0) {
        favouriteContainer.innerHTML = "<p>No Favourite movies found</p>";
        return;
    }

    favourites.forEach((movie) =>{
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
        <div class="movie-poster">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster-img">
        </div>

        <div class="movie-info">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-year">${movie.year}</div>
            <div class="movie-title">${movie.Category}</div>
            <div class="movie-rating">${movie.rating}⭐</div>

            <div class="movie-buttons">
               <button class="btn btn-delete">
                ❌ Remove
               </button>
            </div>
        </div>
        `;
        const removeBtn = card.querySelector(".btn-delete");

        removeBtn.addEventListener("click", () => {
        removeFromFavourite(movie.id);
        });
        favouriteContainer.appendChild(card);
    });

}
getFavouriteMovies();