// Wait until the DOM (Document Object Model) is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Select all elements with the class "genre-button" (i.e., the genre buttons)
    const nameButtons = document.querySelectorAll(".name-button");
    
    // Get the <iframe> element by its ID, which will be used to display the Spotify playlist
    const playlist = document.getElementById("playlist");
    
    // Get the <body> element, which will be used to change the background color
    const body = document.body;

    // Loop through each genre button and add a click event listener
    nameButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Get the genre and background color from the data attributes of the clicked button
            const name = this.dataset.name;
            const bgcolor = this.dataset.bgcolor;

            // Change the background color of the page based on the selected genre
            body.style.backgroundColor = bgcolor;

            // Initialize a variable to hold the URL of the Spotify playlist
            let playlistUrl = "";

            // Use a switch statement to assign the correct playlist URL based on the selected genre
            switch (name) {
                case "alexis":
                    playlistUrl = "https://open.spotify.com/embed/playlist/3sREbslsLCnp15LWg8ilzc";
                    break;
                case "angeleen":
                    playlistUrl = "https://open.spotify.com/embed/playlist/5WQEttF3gkUFiDj0uXzWwG"; 
                    break;
                case "stephanie":
                    playlistUrl = "https://open.spotify.com/embed/track/5CnRBMfpnFB5LAJaFGu6ln"; // song name
                    break;
                case "karienme":
                    playlistUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DX5dpn9ROb26T"; // pop songs
                    break;
                case "emma":
                    playlistUrl = "https://open.spotify.com/embed/playlist/3aqRh5Dbqs2wg0SdnjZ16M"; 
                    break;
                default:
                    playlistUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"; // Default playlist if no genre matches
            }

            // Update the <iframe> element's src attribute to change the displayed Spotify playlist
            playlist.src = playlistUrl;
        });
    });
});
