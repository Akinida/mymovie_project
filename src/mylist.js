// Function to display movies in My List 
async function displayMyList() { 
    const myListContainer = document.getElementById('my-list'); 
    myListContainer.innerHTML = ''; 
    // Clear previous content 
    let myList = JSON.parse(localStorage.getItem('myList')) || []; 
    for (const movie of myList) { 
        try { 
            const response = await fetch(`https://www.omdbapi.com/?t=${movie.Title}&apikey=28c53fba`); 
            const data = await response.json(); 
            const movieElement = document.createElement('div'); 
            movieElement.classList.add('movie'); 
            movieElement.innerHTML = `
                <img src="${data.Poster}" alt="${movie.Title} Poster"> 
                <div class="details">
                    <h2 class="title"> <strong></strong> ${movie.Title}</h2>
                    <p><strong>Runtime:</strong> ${data.Runtime}</p>
                    <p><strong>Year:</strong> ${data.Year}</p>
                    <p><strong>Plot:</strong> ${data.Plot}</p>
                    <p><strong>Language:</strong> ${data.Language}</p>
                    <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
                    <button class="delete-btn" onclick="deleteMovie('${movie.Title}')">Delete</button>
                </div>`; 
            myListContainer.appendChild(movieElement);
        } catch (error) { 
            console.error(`Error fetching movie details for ${movie.Title}: ${error}`);
        }
    }
}

displayMyList()
