# Installation
Instructions on how to install Node JS and NPM (Node Package Manager), then the Bionet MVP.

## Install Node JS & NPM (Node Package Manager)

### Windows / MacOS
On a Windows or Mac, use the installer provided at the [Node JS Downloads](https://nodejs.org/en/download/) page. 

### Ubuntu Linux
On Ubuntu version 16 or above, by default Node JS is referenced from the terminal as ```nodejs``` instead of ```node```. This creates an inconsistency running Node JS scripts and can be corrected by either adding a symlink or by using [NVM](https://github.com/creationix/nvm/blob/master/README.md) (Node Version Manager) to install Node JS. 

#### Install NVM
To install [NVM](https://github.com/creationix/nvm/blob/master/README.md):
```bash
sudo apt update // updates packages
sudo apt install build-essential libss1-dev // adds C++ Compiler & Secure Sockets Layer Toolkit
```
Download installer script:
```bash
// use curl
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

// OR

// use wget
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

#### Use NVM To Install Node JS LTS
```bash
nvm use latest
```

#### Install NPM (Node Package Manager)
```bash
sudo apt install npm
```

#### Restart Your Terminal

#### Validate Install
```bash
node --version // check node version
npm --version // check npm version
```

## Clone Project
In the `terminal` , using `git` , clone the project from github:
```bash
git clone https://github.com/matthewstewart/bionet-mvp-refactor.git
```
This creates a new subdirectory containing the Bionet MVP. Next, change into the project directory:
```bash
cd bionet-mvp-refactor
```

## Install Node Modules
From inside the project directory:
```bash
npm install 
```

## Development Installation Complete
From inside the project directory:
```bash
npm start
```

## View In Web Browser
While the project is running in the terminal, open your web browser and navigate to [http://localhost:3000](http://localhost:3000) for the React Client and [http://localhost:3001/api/v1](http://localhost:3001/api/v1) for the API.

## Stop Project In Terminal
To stop the project from running in the terminal, use `CTRL + C` (PC) or `CMD + C` (Mac).