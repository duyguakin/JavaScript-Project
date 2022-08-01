const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    main.innerHTML = ""; //film adı gelecek apiden

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;  //foreach ile film için gerekli olan parametreler ekleniyor

        const movieEl = document.createElement("div");  //div oluşturuldu.
        movieEl.classList.add("movie");  //filmler bu dive eklenecek

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}" 
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);  //main içine movie el body e appendchild ile eklenir
    });
}
function getClassByRate(vote) {  //filmin puanları için if else 
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {     //search için apideki bilgileri search.value ile alacak preventdefault kullandık eventi pasif yapması için form divi bu
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});