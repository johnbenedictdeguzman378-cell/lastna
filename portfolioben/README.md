# Benedict's personal portfolio

A responsive, build-free portfolio using HTML, CSS, and vanilla JavaScript. All illustrations are local SVG assets; project illustrations are concept mockups, not actual application screenshots.

## Single HTML version

`index.html` now includes its CSS, JavaScript, and all placeholder illustrations. You can open it directly in your browser or use Live Server. Google Fonts and Devicon still use online CDNs; system fonts and skill names remain readable offline.

Edit the embedded `CONFIG` object near the bottom of `index.html` for contact details, resume path, and project links. Edit the `<style>` block for appearance. Embedded illustrations are SVG data URLs; replace their `src` or project `image` values with your own image paths as needed. The optional resume remains a separate PDF at `assets/resume/Benedict-Resume.pdf`; Live Server is required for its availability check.

The original `css/`, `js/`, and illustration files are preserved for reference. They are no longer loaded by `index.html`; changes to them do not affect the single-file version. Instructions below describe the original separated files.

## Run in Visual Studio Code

Open this folder in VS Code, install the **Live Server** extension, then right-click `index.html` and select **Open with Live Server**. No package installation or build command is required. Use an HTTP server rather than opening the HTML file directly so the resume availability check works.

## Personalize

- **Photo:** add `assets/images/profile.jpg` and update the About image `src` in `index.html`. The current `profile.svg` is an illustrated placeholder.
- **Hero:** replace `assets/images/hero-image.svg`, or add `hero-image.png` and update its `src` in `index.html`.
- **Projects:** add `studenthub.png`, `lab-monitoring.png`, and `portfolio.png` to `assets/images/`. Update each `image` value in `CONFIG.projects` in `js/script.js`. Replace concept preview labels with accurate screenshot captions in the project card and modal templates when real screenshots are available.
- **Repositories:** fill each project's `repository` value in `CONFIG.projects` with its real GitHub URL. Empty values show an explanatory message instead of navigating to fake links.
- **Contact:** fill `email`, `github`, and `linkedin` in `CONFIG` at the top of `js/script.js`. Social URLs must begin with `https://`. Placeholder contact details never navigate to fake profiles.
- **Resume:** add your actual PDF at `assets/resume/Benedict-Resume.pdf`. Buttons work after a page refresh. The site verifies the PDF signature; absent or non-PDF responses produce a clear message. No fabricated resume is included.
- **Content:** edit text in `index.html`, project descriptions and focus lists in `js/script.js`, and colors in `:root` in `css/style.css`.

## Contact delivery

The form validates all fields and opens a `mailto:` draft after an email address is configured. The visitor must send it through their email app; the site does not claim delivery or clear the message. A configured email client is required. For direct delivery, connect a service such as EmailJS or a server endpoint, replace the submit handler, and show success only after the service confirms success. Never put private API keys in frontend files.

## Accessibility and dependencies

Includes semantic sections, skip navigation, visible focus, native modal focus management and Escape dismissal, active navigation, mobile menu controls, status messages, and reduced-motion support. Google Fonts and Devicon load from external CDNs; system fonts and readable technology names remain available offline. Illustrations work offline.

## Manual checks

Check desktop and narrow mobile layouts; navigate using Tab; open and close every project dialog using Escape; toggle mobile navigation; submit empty/invalid forms; test the unconfigured contact message; add a genuine PDF and test view/download; enable reduced motion in OS settings. No backend or analytics is included.
