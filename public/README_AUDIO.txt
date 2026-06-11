Place your background music file here!

To make the background music play on your website:
1. Rename your MP3 file to 'background.mp3' (all lowercase).
2. Save/Upload it into this 'public/' directory (as 'public/background.mp3').

Why is this directory required?
Vite (the build tool) loads static assets from the 'public' folder and copies them to the production root. If your file is outside this folder (for example, at the root of the project), Vite will ignore it, resulting in a 404 (Not Found) error on the deployed website.

Note about Browser Autoplay Policies:
All modern web browsers block background music from playing immediately on page load until a user interacts with the page (taps, clicks, or presses a key). Our code listens for the first user interaction and plays the music immediately.
