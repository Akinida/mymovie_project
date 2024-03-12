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
        // Store the state of the button in local storage 
        localStorage.setItem(title + '_add', button.querySelector('.add-icon').classList.contains('green'));
    }
}

// Function to fetch movie details for each movie and add buttons 
async function fetchMovieDetails(movieId, title) {
    const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=28c53fba`);
    const data = await response.json();
    const movieDetailsDiv = document.getElementById(movieId);
    if (movieDetailsDiv) {
        if (movieDetailsDiv.querySelector('.thriller-details')) {
            const details = movieDetailsDiv.querySelector('.thriller-details');
            const img = movieDetailsDiv.querySelector('img');
            details.innerHTML =
                `<h3>${data.Title}</h3>
                <h3>${data.Year}</h3>
                <h3>${data.Genre}</h3>
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
            // Check if the movie was previously liked 
            const liked = localStorage.getItem(data.Title + '_like');
            if (liked === 'true') {
                details.querySelector('.like-btn .heart-path').classList.add('red');
            }
            // Check if the movie was previously added to My List 
            const added = localStorage.getItem(data.Title + '_add');
            if (added === 'true') {
                details.querySelector('.watch-list-btn .add-icon').classList.add('green');
            }
        } else if (movieDetailsDiv.querySelector('.thriller2-details')) {
            const details = movieDetailsDiv.querySelector('.thriller2-details');
            const img = movieDetailsDiv.querySelector('img');
            details.innerHTML =
                `<h3>${data.Title}</h3>
                <h3>${data.Year}</h3>
                <h3>${data.Genre}</h3>
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
            // Check if the movie was previously liked 
            const liked = localStorage.getItem(data.Title + '_like');
            if (liked === 'true') {
                details.querySelector('.like-btn .heart-path').classList.add('red');
            }
            // Check if the movie was previously added to My List 
            const added = localStorage.getItem(data.Title + '_add');
            if (added === 'true') {
                details.querySelector('.watch-list-btn .add-icon').classList.add('green');
            }
        } else if (movieDetailsDiv.querySelector('.action-details')) {
            const details = movieDetailsDiv.querySelector('.action-details');
            const img = movieDetailsDiv.querySelector('img');
            details.innerHTML =
                `<h3>${data.Title}</h3>
                <h3>${data.Year}</h3>
                <h3>${data.Genre}</h3>
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
            // Check if the movie was previously liked 
            const liked = localStorage.getItem(data.Title + '_like');
            if (liked === 'true') {
                details.querySelector('.like-btn .heart-path').classList.add('red');
            }
            // Check if the movie was previously added to My List 
            const added = localStorage.getItem(data.Title + '_add');
            if (added === 'true') {
                details.querySelector('.watch-list-btn .add-icon').classList.add('green');
            }
        }else if (movieDetailsDiv.querySelector('.action2-details')) {
            const details = movieDetailsDiv.querySelector('.action2-details');
            const img = movieDetailsDiv.querySelector('img');
            details.innerHTML = 
                `<h3>${data.Title}</h3>
                <h3>${data.Year}</h3>
                <h3>${data.Genre}</h3>
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
            // Check if the movie was previously liked 
            const liked = localStorage.getItem(data.Title + '_like'); 
            if (liked === 'true') { 
                details.querySelector('.like-btn .heart-path').classList.add('red');
            }
            // Check if the movie was previously added to My List 
            const added = localStorage.getItem(data.Title + '_add'); 
            if (added === 'true') { 
                details.querySelector('.watch-list-btn .add-icon').classList.add('green'); 
            }
        } else if (movieDetailsDiv.querySelector('.horror-details')) { 
            const details = movieDetailsDiv.querySelector('.horror-details'); 
            const img = movieDetailsDiv.querySelector('img'); 
            details.innerHTML = 
                `<h3>${data.Title}</h3>
                <h3>${data.Year}</h3>
                <h3>${data.Genre}</h3>
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
            // Check if the movie was previously liked 
            const liked = localStorage.getItem(data.Title + '_like'); 
            if (liked === 'true') { 
                details.querySelector('.like-btn .heart-path').classList.add('red');
            }
            // Check if the movie was previously added to My List 
            const added = localStorage.getItem(data.Title + '_add'); 
            if (added === 'true') { 
                details.querySelector('.watch-list-btn .add-icon').classList.add('green'); 
            }
        } else if (movieDetailsDiv.querySelector('.horror2-details')) { 
            const details = movieDetailsDiv.querySelector('.horror2-details'); 
            const img = movieDetailsDiv.querySelector('img'); 
            details.innerHTML = 
                `<h3>${data.Title}</h3>
                <h3>${data.Year}</h3>
                <h3>${data.Genre}</h3>
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
            // Check if the movie was previously liked 
            const liked = localStorage.getItem(data.Title + '_like'); 
            if (liked === 'true') { 
                details.querySelector('.like-btn .heart-path').classList.add('red');
            }
            // Check if the movie was previously added to My List 
            const added = localStorage.getItem(data.Title + '_add'); 
            if (added === 'true') { 
                details.querySelector('.watch-list-btn .add-icon').classList.add('green'); 
            }
        } else {
            console.error(`Element with ID '${movieId}' not found.`);
        }
    }
}
// Fetch movie details for each movie 
document.addEventListener('DOMContentLoaded', function () {
    //THRILLER 
    fetchMovieDetails('ballerina', 'Ballerina');
    fetchMovieDetails('gravity', 'Gravity');
    fetchMovieDetails('the-8-night', 'The 8th Night');
    fetchMovieDetails('parasite', 'Parasite');
    fetchMovieDetails('next', 'Next');
    fetchMovieDetails('stowaway', 'Stowaway');
    fetchMovieDetails('tenet', 'Tenet');
    fetchMovieDetails('eagleEye', 'Eagle Eye');
    fetchMovieDetails('davinci', 'The Da Vinci Code');
    fetchMovieDetails('thanksgiving', 'Thanksgiving');
    fetchMovieDetails('metamorphosis', 'Metamorphosis');
    fetchMovieDetails('venom', 'Venom');

    // ACTION 
    fetchMovieDetails('paskal', 'Paskal');
    fetchMovieDetails('the-Childe', 'The Childe');
    fetchMovieDetails('lift', 'Lift');
    fetchMovieDetails('alienoid', 'Alienoid');
    fetchMovieDetails('dilwale', 'Dilwale');
    fetchMovieDetails('double-World', 'Double World');
    fetchMovieDetails('warcraft', 'Warcraft');
    fetchMovieDetails('believer', 'Believer');
    fetchMovieDetails('rampant', 'Rampant');
    fetchMovieDetails('godzilla', 'Godzilla');
    fetchMovieDetails('uncharted', 'Uncharted');
    fetchMovieDetails('sixtyMinutes', 'Sixty Minutes');

    // HORROR 
    fetchMovieDetails('peninsula', 'Peninsula');
    fetchMovieDetails('evilDeadRise', 'Evil Dead Rise');
    fetchMovieDetails('indigo', 'Indigo');
    fetchMovieDetails('deadSilence', 'Dead Silence');
    fetchMovieDetails('theMedium', 'The Medium');
    fetchMovieDetails('susuk', 'Susuk');
    fetchMovieDetails('sewu', 'Patient Zero');
    fetchMovieDetails('quarantine', 'Quarantine');
    fetchMovieDetails('creep', 'Creep');
    fetchMovieDetails('case', 'Case 39');
    fetchMovieDetails('crawl', 'Crawl');
    fetchMovieDetails('tigerStripes', 'Tiger Stripes');
});
   
        
    