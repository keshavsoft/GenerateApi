# CrudExtension
write end points in nodejs

## Features

- Helps you establish CRUD and also to write SubRoutes and insert EndPoints of your wish.

## Usage

1. Open an Empty Folder.
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
3. Search for and run (`OnlyBackEnd NonSecured`).
4. Find the available options there ( like `OnlyBackEnd NonSecured`).
5. All the Folders and Files are copied to your empty Folder.
6. .env file the place where you define ( Data Path and Port Number ).
7. app.js is entry file.
8. on successfull completion, node will automatically run at port number in .env file

## project-root/ 

├── app.js 
├── .env 
├── V1/ 
│ └── yourRoutes.js 
├──SV1/
│ └── yoursecureRoutes.js 
├── Token/ 
├── Schemas/ 
│ └── yourSchmea.json
├── Data/ 
| └── db.json
├──schema.json
└── public

## Requirements

- Visual Studio Code version 1.50.0 or higher.
- https://marketplace.visualstudio.com/items?itemName=humao.rest-client
- https://www.npmjs.com/package/gulp-cli
- https://git-scm.com/
- https://nodejs.org/en/download (22 is tested)
  
## Extension Settings

.env

## Known Issues

- No known issues.

primay reason for this repo is to build dynamic end points complete programatically

## Release Notes

### 1.1.1

simple start with OnlyBackEnd.NonSecured

### 1.1.2

Api path started

### License

MIT