```
cd existing_folder
git init --initial-branch=main
git remote add origin git@git.alt-tools.tech:aquildev/projet-ecole/front.git
git add .
git commit -m "Initial commit"
git push --set-upstream origin main

first commit - test3
```
first branche VR : ec-40_Admin

Procédure création projet React Vite

1° - npm create vite@latest
: choisir le nom du projet
: choisir React + Typescript

2° se placer dans le projet cd {nom du projet} 

3° - npm i (node modules)

4° - npm i react-router-dom

5° - npm install formik --save 

6° - npm install yup 

7° - npm i axios

8° - npm install -D tailwindcss postcss autoprefixer

9° - npx tailwindcss init -p 

: modifier le fichier `tailwind.config.js`

=====================

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}

=====================

10° - dans le fichier `index.css`, remplacer le code existant par :

=========

@tailwind base;
@tailwind components;
@tailwind utilities;

==========

11° - npm i flowbite-react

12° - npm run dev

13° et consulter le localhost:
