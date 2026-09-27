const movieDetail = document.querySelector("#movie-detail");
const params = new URLSearchParams(location.search);
const imdbID = params.get("id");

if (imdbID) {
    searchMovie(imdbID.trim());
}

async function searchMovie(imdbID) {

    movieDetail.innerHTML = `
        <div class="flex justify-center items-center py-20">
            <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    `;

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=e2e6a54f&i=${imdbID}&plot=full`
        );

        const data = await response.json();

        if (data.Response === "True") {
            displayMovie(data);
        } else {
            movieDetail.innerHTML = `
                <div class="text-center py-20">
                    <h2 class="text-3xl font-bold text-red-400">
                        ${data.Error}
                    </h2>
                </div>
            `;
        }

    } catch (error) {

        movieDetail.innerHTML = `
            <div class="text-center py-20">
                <h2 class="text-3xl font-bold text-red-400">
                    Something Went Wrong
                </h2>
            </div>
        `;

        console.error(error);
    }
}

function displayMovie(data) {

    movieDetail.innerHTML = `
    
        <div class="detail-shell max-w-7xl mx-auto p-6">

        <div class="detail-layout">

            <div class="detail-poster-wrap">

                <!-- Poster -->
                <img
                    src="${data.Poster}"
                    alt="${data.Title}"
                    class="detail-poster"
                >
            </div>

                <!-- Movie Info -->
                <div class="detail-copy">

                    <p class="eyebrow">Movie file</p>
                    <h1 class="detail-title">
                        ${data.Title}
                    </h1>

                    <div class="detail-meta">

                        <span>
                            ${data.Year}
                        </span>

                        <span>
                            ${data.Rated}
                        </span>

                        <span>
                            ${data.Runtime}
                        </span>

                        <span class="detail-rating">
                            IMDb ${data.imdbRating}/10
                        </span>

                    </div>

                    <p class="detail-genres">
                        ${data.Genre}
                    </p>

                    <!-- Plot -->
                    <div class="detail-plot">
                        <h2>
                            The story
                        </h2>

                        <p>
                            ${data.Plot}
                        </p>
                    </div>

                    <!-- Details -->
                    <div class="detail-facts">

                        <div>
                            <h3>
                                Director
                            </h3>
                            <p>${data.Director}</p>
                        </div>

                        <div>
                            <h3>
                                Writer
                            </h3>
                            <p>${data.Writer}</p>
                        </div>

                        <div>
                            <h3>
                                Actors
                            </h3>
                            <p>${data.Actors}</p>
                        </div>

                        <div>
                            <h3>
                                Released
                            </h3>
                            <p>${data.Released}</p>
                        </div>

                        <div>
                            <h3>
                                Language
                            </h3>
                            <p>${data.Language}</p>
                        </div>

                        <div>
                            <h3>
                                Country
                            </h3>
                            <p>${data.Country}</p>
                        </div>

                    </div>

                    <!-- Buttons -->
                    <div class="detail-actions">

                        <a
                            href="https://www.imdb.com/title/${data.imdbID}"
                            target="_blank"
                            class="detail-action detail-action-primary"
                        >
                            View on IMDb
                        </a>

                        <a
                            href="index.html"
                            class="detail-action"
                        >
                            Back to Search
                        </a>

                    </div>

                </div>

            </div>

        </div>

    </div>
    `;
}