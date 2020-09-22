<div align="center">
  <img src="./public/img/icons/icon-512x512.png" alt="105 logo" height="120">
  <h3>Revise the best way</h3>
  <a href="https://105app.exybo.re">Website</a>
  <br>
  <a href="https://app.netlify.com/sites/105app/deploys">
    <img src="https://api.netlify.com/api/v1/badges/00165e74-2ef0-4f96-99d2-2fae4fd3b3ef/deploy-status" slt="Netlify status">
  </a>
  <a href="https://github.com/theovidal/105app/blob/master/.LICENSE">
    <img src="https://img.shields.io/github/license/theovidal/105app" alt="License"/>
  </a>
  <a href="https://github.com/theovidal/105app/issues">
    <img src="https://img.shields.io/github/issues/theovidal/105app" alt="Opened issues"/>
  </a>
</div>

- [🌈 How it works](#-how-it-works)
- [📬 Adding files](#-adding-files)
- [💻 Development](#-development)
  - [Environment setup](#environment-setup)
  - [Building the app](#building-the-app)
  - [Linting and fixing files](#linting-and-fixing-files)
  - [Customizing configuration](#customizing-configuration)
- [📜 Credits](#-credits)
- [🔐 License](#-license)

## 🌈 How it works

This simple app stores files in defined formats for example Microsoft Word and PDF, and then displays PDFs or JSON lists to the user. These files are organized by subjects, the user can search files and store them in personal, client-side libraries.

French students personally wrote these files that aim to help others during exam revisions.

## 📬 Adding files

If you want to add your own file to 105, head over to [the adding form](https://framaforms.org/soumettre-une-fiche-pour-105app-1593639677) and complete it!

## 💻 Development

Make sure you have NodeJS 12+ installed on your computer, as well as Git in any form - CLI, UI, GitHub...

### Environment setup

First of all, clone the repository from GitHub on your local machine : (this requires Git to be installed)

```bash
git clone https://github.com/theovidal/105app.git  # Using HTTP
git clone git@github.com:theovidal/105app          # Using SSH
```

Install the required dependencies using your favorite package manager :

```bash
npm install   # Using NPM
yarn install  # Using Yarn
```

Then, run the application using the `serve` command : (Make sure you installed Vue CLI on your system)

```bash
npm run serve  # Using NPM
yarn serve     # Using Yarn
```

A web server will start with hot reload enabled, perfect to develop.

### Building the app

To get a built version of the application ready to be served by a HTTP server, use the `build` command :

```bash
npm run build  # Using NPM
yarn build     # Using Yarn
```

Files will be generated in the `dist` folder, and the entry point will be the `index.html` file.

### Linting and fixing files

To lint the files and check for formatting, run the `lint` command :

```bash
npm run lint  # Using NPM
yarn lint     # Using Yarn
```

If a better formatting is available, new code will be written directly inside the concerned files.

### Customizing configuration

If you want to customize the build configuration, check the [Configuration Reference](https://cli.vuejs.org/config/) on the Vue CLI documentation.

## 📜 Credits

- Main libraries : [VueJS](https://vuejs.org), [Vuetify](https://vuetifyjs.com)
- Maintainer : [Théo Vidal](https://github.com/theovidal)

## 🔐 License

This project is under the [GNU GPL v3](./LICENSE) license.

**WARNING : this license is here as a placeholder for your project : the template itself is completely free, without any license !**
