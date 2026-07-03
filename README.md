# Kylie & Prince — Portfolio (HTML/CSS/JS)

A clean, responsive portfolio landing page built with plain HTML, CSS, and
JavaScript. This project is designed to be easy to customize and deploy
without any build process or framework.

## 🚀 Overview

This portfolio includes:

- A hero section with name, role, and resume CTA
- Project and service highlights rendered from data
- Team member profiles with résumé links
- Static asset support for files like `resume.pdf`
- Responsive styling with a lightweight codebase

## 📁 Project structure

```
portfolio-vanilla/
├── index.html        main page markup and navigation
├── assets/           static files (resume, images, etc.)
├── css/
│   └── styles.css    visual styling and layout
└── js/
    ├── data.js       content source for specialties, projects, and team
    └── main.js       DOM rendering and page behavior
```

## ✏️ Customize content

For content updates, edit **`js/data.js`**:

- change names, job titles, and bios
- update the service or project lists
- modify team member data and resume links

`index.html` and `js/main.js` do not require changes for most content edits.

If you add new images or files, place them inside `assets/` and update the
relevant references in `index.html` or `js/data.js`.

## ▶️ Preview locally

Open `index.html` directly in a browser for a quick preview.

For a more accurate static site preview, run:

```bash
npx serve .
```

## ☁️ Deploy

This repository is ready for static hosting with no build step.
Deploy the folder directly to any of the following:

- Vercel
- Netlify
- GitHub Pages
- any static file server

## 📌 Important notes

- The resume links in the page expect `assets/resume.pdf`.
- If you want a custom favicon, add a `<link rel="icon" ...>` tag in
  `index.html`.

## 💡 Suggestions

- Add social links such as GitHub or LinkedIn to the header or team cards.
- Replace initials or placeholders with actual photos or brand assets.
- Add more sections like testimonials, contact form, or skill badges.
