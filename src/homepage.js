// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "director"><b>Director:</b> ${details.Director}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});
console.log(localStorage)
// Function to add a movie to My List or remove it 

// Function to add a movie to My List or remove it 
function addToMyList(title, button) { 
    const movie = {
        Title: title,
        // Add more details if needed
    }; 
    let myList = JSON.parse(localStorage.getItem('myList')) || [];
    const isAdded = button.querySelector('.add-icon').classList.contains('green'); 
    if (isAdded) {
        // If the movie is already added, remove it from My List 
        const index = myList.findIndex(item => item.Title === title); 
        if (index !== -1) {
            myList.splice(index, 1); 
            localStorage.setItem('myList', JSON.stringify(myList));
            // Show pop-up message for removal 
            const popup = document.getElementById('popup'); 
            popup.textContent = 'Removed from My List'; 
            popup.classList.add('show');
            // Hide pop-up after 2 seconds 
            setTimeout(function() { 
                popup.classList.remove('show');
            }, 2000); 
        }
        // Toggle the 'green' class on the add icon
        button.querySelector('.add-icon').classList.remove('green');
    } else {
        // If the movie is not added, add it to My List
        myList.push(movie); 
        localStorage.setItem('myList', JSON.stringify(myList));
        // Toggle the 'green' class on the add icon
        button.querySelector('.add-icon').classList.add('green');
        // Show pop-up message for addition 
        const popup = document.getElementById('popup'); 
        popup.textContent = 'Added to My List'; 
        popup.classList.add('show'); 
        // Hide pop-up after 2 seconds
        setTimeout(function() { 
            popup.classList.remove('show'); 
        }, 2000); 
    }
    // Store the state of the button in local storage 
    localStorage.setItem(title + '_add', button.querySelector('.add-icon').classList.contains('green')); 
}



async function fetchMovieDetails(movieId, title) { 
    const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=28c53fba`); 
    const data = await response.json(); 
    const movieDetailsDiv = document.getElementById(movieId); 
    if (movieDetailsDiv) { 
        if (movieDetailsDiv.querySelector('.box-office-details')) { 
            const details = movieDetailsDiv.querySelector('.box-office-details'); 
            const img = movieDetailsDiv.querySelector('img'); 
            details.innerHTML = `<h3>${data.Title}</h3>
            <h3>${data.Year}</h3>
            <h3>${data.BoxOffice}</h3> 
            <div class="button-group">
                <button class="watch-list-btn" onclick="addToMyList('${data.Title}', this)">
                    <svg class="add" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path class="add-icon" fill="none" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                    </svg>
                </button>
                <button class="like-btn" onclick="likeMovie('${data.Title}', this)">
                    <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path class="heart-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>`;
            img.src = data.Poster; // Update the image source 
            img.alt = data.Title; // Update the alt attribute with movie title
        } else if (movieDetailsDiv.querySelector('.top-rated-details')) { 
            const details = movieDetailsDiv.querySelector('.top-rated-details'); 
            const img = movieDetailsDiv.querySelector('img'); 
            details.innerHTML = `<h3>${data.Title}</h3>
        <h3>${data.Year}</h3>
        <h3>${data.imdbRating}</h3>
        <div class="button-group">
            <button class="watch-list-btn" onclick="addToMyList('${data.Title}', this)">
                <svg class="add" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path class="add-icon" fill="none" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                </svg>
            </button>
            <button class="like-btn" onclick="likeMovie('${data.Title}', this)">
                <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path class="heart-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button> 
        </div>`;
            img.src = data.Poster; // Update the image source 
            img.alt = data.Title; // Update the alt attribute with movie title
        } else if (movieDetailsDiv.querySelector('.top-animated-details')){ 
            const details = movieDetailsDiv.querySelector('.top-animated-details'); 
            const img = movieDetailsDiv.querySelector('img'); 
            details.innerHTML = `<h3>${data.Title}</h3>
        <h3>${data.Year}</h3>
        <h3>${data.Country}</h3>
        <div class="button-group">
            <button class="watch-list-btn" onclick="addToMyList('${data.Title}', this)">
                <svg class="add" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path class="add-icon" fill="none" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                </svg>
            </button>
            <button class="like-btn" onclick="likeMovie('${data.Title}', this)">
                <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path class="heart-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button> 
        </div>`;
            img.src = data.Poster; // Update the image source 
            img.alt = data.Title; // Update the alt attribute with movie title
        } else if (movieDetailsDiv.querySelector('.harry-potter-details')){ 
            const details = movieDetailsDiv.querySelector('.harry-potter-details'); 
            const img = movieDetailsDiv.querySelector('img'); 
            details.innerHTML = `<h3>${data.Title}</h3>
        <h3>${data.Year}</h3>
        <h3>${data.Country}</h3>
        <div class="button-group">
            <button class="watch-list-btn" onclick="addToMyList('${data.Title}', this)">
                <svg class="add" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path class="add-icon" fill="none" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                </svg>
            </button>
            <button class="like-btn" onclick="likeMovie('${data.Title}', this)">
                <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path class="heart-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button> 
        </div>`;
            img.src = data.Poster; // Update the image source 
            img.alt = data.Title; // Update the alt attribute with movie title
        } else if (movieDetailsDiv.querySelector('.star-wars-details')){ 
            const details = movieDetailsDiv.querySelector('.star-wars-details'); 
            const img = movieDetailsDiv.querySelector('img'); 
            details.innerHTML = `<h3>${data.Title}</h3>
        <h3>${data.Year}</h3>
        <h3>${data.Country}</h3>
        <div class="button-group">
            <button class="watch-list-btn" onclick="addToMyList('${data.Title}', this)">
                <svg class="add" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path class="add-icon" fill="none" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 3232V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                </svg>
            </button>
            <button class="like-btn" onclick="likeMovie('${data.Title}', this)">
                <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path class="heart-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button> 
        </div>`;
            img.src = data.Poster; // Update the image source 
            img.alt = data.Title; // Update the alt attribute with movie title
        }else if (movieDetailsDiv.querySelector('.spider-man-details')){ 
            const details = movieDetailsDiv.querySelector('.spider-man-details'); 
            const img = movieDetailsDiv.querySelector('img'); 
            details.innerHTML = `<h3>${data.Title}</h3>
        <h3>${data.Year}</h3>
        <h3>${data.Country}</h3>
        <div class="button-group">
            <button class="watch-list-btn" onclick="addToMyList('${data.Title}', this)">
                <svg class="add" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path class="add-icon" fill="none" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 3232V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                </svg>
            </button>
            <button class="like-btn" onclick="likeMovie('${data.Title}', this)">
                <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path class="heart-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button> 
        </div>`;
            img.src = data.Poster; // Update the image source 
            img.alt = data.Title; // Update the alt attribute with movie title
        } else {
            console.error(`Element with ID '${movieId}' not found.`);
        } 
        
        const liked = localStorage.getItem(title + '_like'); 
        if (liked === 'true') { 
            const likeButton = movieDetailsDiv.querySelector('.like-btn'); 
            if (likeButton) { 
                likeButton.querySelector('.heart-path').classList.add('red'); 
            } 
        } 
        
        const added = localStorage.getItem(title + '_add'); 
        if (added === 'true') { 
            const addedButton = movieDetailsDiv.querySelector('.watch-list-btn'); 
            if (addedButton) { 
                addedButton.querySelector('.add-icon').classList.add('green');
            }
        }
    } 
} 
        
        document.addEventListener('DOMContentLoaded', function() {
            // Fetch movie details for each movie
            fetchMovieDetails('avengers-endgame', 'Avengers Endgame'); 
            fetchMovieDetails('avatar', 'Avatar');
            fetchMovieDetails('avatar-ii', 'Avatar: The Way of Water'); 
            fetchMovieDetails('titanic', 'Titanic'); 
            fetchMovieDetails('barbie', 'Barbie'); 
            fetchMovieDetails('frozen-ii', 'Frozen II');
        
            // Fetch top-rated movie details
            fetchMovieDetails('shawshank', 'The Shawshank Redemption'); 
            fetchMovieDetails('godfather', 'The Godfather'); 
            fetchMovieDetails('dark-knight', 'The Dark Knight'); 
            fetchMovieDetails('godfather-ii', 'The Godfather Part II'); 
            fetchMovieDetails('angry-men', '12 Angry Men');
            fetchMovieDetails('lord-of-the-rings', 'The Lord of the Rings: The Return of the King');
        
            // Fetch top-animated movie details 
            fetchMovieDetails('spirited-away', 'Spirited Away'); 
            fetchMovieDetails('finding-nemo', 'Finding Nemo'); 
            fetchMovieDetails('shrek', 'Shrek'); 
            fetchMovieDetails('inside-out', 'Inside Out'); 
            fetchMovieDetails('ratatouille', 'Ratatouille'); 
            fetchMovieDetails('soul', 'Soul');
        
            // Fetch Harry Potter series details 
            fetchMovieDetails('harry-i', "Harry Potter and the Chamber of Secrets"); 
            fetchMovieDetails('harry-ii', "Harry Potter and the Sorcerer's Stone"); 
            fetchMovieDetails('harry-iii', 'Harry Potter and the Prisoner of Azkaban'); 
            fetchMovieDetails('harry-iv', 'Harry Potter and the Goblet of Fire'); 
            fetchMovieDetails('harry-v', 'Harry Potter and the Order of the Phoenix'); 
            fetchMovieDetails('harry-vi', 'Harry Potter and the Half-Blood Prince');
        
            // Fetch Scary Movie series details 
            fetchMovieDetails('star-wars-i', "Star Wars: Episode I - The Phantom Menace"); 
            fetchMovieDetails('star-wars-ii', "Star Wars: Episode II - Attack of the Clones"); 
            fetchMovieDetails('star-wars-iii', 'Star Wars: Episode III - Revenge of the Sith'); 
            fetchMovieDetails('star-wars-iv', 'Star Wars: Episode IV - A New Hope'); 
            fetchMovieDetails('star-wars-v', 'Star Wars: Episode V - The Empire Strikes Back'); 
            fetchMovieDetails('star-wars-vi', 'Star Wars: Episode VI - Return of the Jedi');
        
            // Fetch Spider Man details 
            fetchMovieDetails('spider-man-i', "Spider-Man"); 
            fetchMovieDetails('spider-man-ii', "Spider-Man 2"); 
            fetchMovieDetails('spider-man-iii', 'Spider-Man 3'); 
            fetchMovieDetails('spider-man-iv', 'The Amazing Spider-Man'); 
            fetchMovieDetails('spider-man-v', 'The Amazing Spider-Man 2'); 
            fetchMovieDetails('spider-man-vi', 'Spider-Man: Homecoming');
        }); 
        
    