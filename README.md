Maison des Kréateurs

Where ideas take the shape of reality.

Maison des Kréateurs is the personal portfolio and atelier of Khushi Kakar, a Computer Science & Electrical Engineering student at UMass Amherst. It is a home for past achievements, works in progress, and new ideas, built as a single scroll-driven page.

The emblem

The logo was designed at age 15. It is a house shape (maison) that forms both an M for the brand and a K for the maker's name. It appears throughout the site as the loader animation, the 3D hero emblem, the corner brand mark, and the star the robot arm sketches.

Highlights
Scroll-driven hero: a night sky with a moon and layered mountain ridges, with hand-drawn (pen-filter) line art that reacts as you scroll.
Sections: About, Path, Atelier (projects), Skills, Honours & Leadership, Giving Back, and Contact.
Philosophy interlude: animated line-art whales drift across the page.
Robot arm: a gold line-art arm that sketches the Maison star.
Hidden circuit game: press the ✦ spark to open Build the robot, a timed wiring puzzle with score, combo, best time (saved locally), and sound toggle.
Legal dialogs: built-in Privacy Policy and Copyright notice.
Projects featured in the Atelier
Project	Stack
Classroom Attentiveness Checker	Python, OpenCV, Computer Vision
Chem-E-Car Vehicle	Circuit design, Electronics, Debugging
EEG-Powered Bionic Arm	Research
Humanoid Robot Simulation	Gazebo, Robotics Simulation
Generative Mandala Art	Python, Tkinter, Turtle Graphics
Wildlife Reserve Management System	Python, MySQL, Database Design
Tech
Plain HTML, CSS and JavaScript with no frameworks and no build step.
Inline SVG for the scene, emblem, whales and robot arm, plus a <canvas> for the starry sky.
Native <dialog> elements for the game and legal pages.
Fonts: Cormorant Garamond and Zilla Slab via Google Fonts.
A strict Content-Security-Policy: no third-party scripts, no trackers, no cookies, no analytics.
Project structure
.
├── index.html
├── css/
│   ├── styles.css
│   └── game.css
├── js/
│   ├── main.js      # scroll scene, sky, whales, robot arm, loader
│   ├── game.js      # "Build the robot" circuit game
│   └── legal.js     # privacy and copyright dialogs, email link
└── images/
    └── headshot.jpg
Running locally

Accessibility and privacy
Semantic sections with a labelled navigation bar, and decorative SVGs hidden from assistive tech.
A <noscript> fallback hides the loader if JavaScript is disabled.
The only data stored is the game's best time, kept in your browser's local storage and never sent anywhere.
Copyright

© 2026 Khushi Kakar. All rights reserved. The Maison des Kréateurs name and emblem, illustrations, animations, code, and portrait may not be copied, redistributed, or used to train machine-learning models without written permission. Short excerpts with credit and a link back are welcome.

Fonts are served under the SIL Open Font License 1.1.
