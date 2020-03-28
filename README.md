<div align="center">
  <img src="./public/img/logo.png" alt="Highest logo" height="120">
  <h3>Vue.js template used by Highest</h3>
  <a href="https://highest.netlify.com">Website</a>
  <br>
  <a href="https://github.com/highest-app/template/blob/master/.LICENSE">
    <img src="https://img.shields.io/github/license/highest-app/highest" alt="License"/>
  </a>
  <a href="https://github.com/highest-app/template/issues">
    <img src="https://img.shields.io/github/issues/exybore/highest" alt="Opened issues"/>
  </a>
</div>

- [🌈 How it works](#-how-it-works)
- [💻 Development](#-development)
  - [Environment setup](#environment-setup)
  - [Building the app](#building-the-app)
  - [Linting and fixing files](#linting-and-fixing-files)
  - [Customizing configuration](#customizing-configuration)
- [📜 Credits](#-credits)
- [🔐 License](#-license)

## 🌈 How it works

It's a really simple template built on top of Vue.js. It includes :

- Vuetify framework (Material Design components)
- Vue Router
- Vuex (stores)
- Service worker and PWA (offline usage)
- ESLint (code quality)

It's used by [Highest](https://github.com/highest-app/highest) and delivered for everyone to use for various web projects.

## 💻 Development

### Environment setup

First of all, clone the repository from GitHub on your local machine : (this requires Git to be installed)

```bash
git clone https://github.com/highest-app/template.git  # Using HTTP
git clone git@github.com:highest-app/template          # Using SSH
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
- Maintainer : [Exybore](https://github.com/exybore)

## 🔐 License

This project is under the [GNU GPL v3](./LICENSE) license.

**WARNING : this license is here as a placeholder for your project : the template itself is completely free, without any license !**
