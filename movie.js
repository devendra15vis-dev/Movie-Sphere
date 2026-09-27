const movieHub = document.querySelector("#movieHub");
const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");

// Default Trending Movies
loadTrendingMovies();

// Search Form
movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = movieInput.value.trim();

    if (!query) return;

    searchMovie(query);
});

// Load Trending Movies
async function loadTrendingMovies() {

    movieHub.innerHTML = `
        <div class="col-span-full flex justify-center py-10">
            <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    `;

    try {

        const response = await fetch(
            "https://www.omdbapi.com/?apikey=e2e6a54f&s=avengers"
        );

        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        }

    } catch (error) {

        movieHub.innerHTML = `
            <div class="col-span-full text-center text-red-400">
                Failed to load movies
            </div>
        `;

        console.error(error);
    }
}

// Search Movies
async function searchMovie(movieName) {

    movieHub.innerHTML = `
        <div class="col-span-full flex justify-center py-10">
            <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    `;

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=e2e6a54f&s=${encodeURIComponent(movieName)}`
        );

        const data = await response.json();

        if (data.Response === "True") {

            displayMovies(data.Search);

        } else {

            movieHub.innerHTML = `
                <div class="col-span-full text-center py-10">
                    <h2 class="text-2xl text-red-400 font-bold">
                        ${data.Error}
                    </h2>
                </div>
            `;
        }

    } catch (error) {

        movieHub.innerHTML = `
            <div class="col-span-full text-center py-10">
                <h2 class="text-2xl text-red-400 font-bold">
                    Something went wrong
                </h2>
            </div>
        `;

        console.error(error);
    }
}

// Display Movies
function displayMovies(movies) {

    movieHub.innerHTML = "";

    movies.forEach((movie) => {

        const card = document.createElement("div");

        // Save IMDb ID
        card.dataset.imdbID = movie.imdbID;

        card.className = "movie-card";

        card.innerHTML = `
            <div class="overflow-hidden">

                <img
                    src="${
                        movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://placehold.co/400x600?text=No+Image"
                    }"
                    alt="${movie.Title}"
                    class="movie-poster"
                >

            </div>

            <div class="movie-card-body">

                <h3 class="movie-card-title">
                    ${movie.Title}
                </h3>

                <p class="movie-card-year">
                    ${movie.Year}
                </p>

                <button
                    class="movie-card-action" type="button">
                    View details <span aria-hidden="true">↗</span>
                </button>

            </div>
        `;

        movieHub.appendChild(card);
    });
}

// Movie Card Click
movieHub.addEventListener("click", (e) => {

    const movieCard = e.target.closest(".movie-card");

    if (!movieCard) return;

    const imdbID = movieCard.dataset.imdbID;

    // Open Details Page
    location.href = `movie-details.html?id=${imdbID}`;
});