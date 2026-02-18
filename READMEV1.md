# CrudExtension
write end points in nodejs

## Features

- Helps you establish CRUD and also to write SubRoutes and insert EndPoints of your wish.

## Usage

1. Open an Empty Folder.
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
3. Search for and run (`GenerateWMail FrontAndBackWithGulp`).
4. Find the available options there ( like `GenerateWMail`).
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

## Extension Settings

.env


## *Installation*

1. *Install the Extension*
   - Open *VS Code*.
   - Go to the Extensions panel (Ctrl+Shift+X / Cmd+Shift+X on Mac).
   - Search for *GenerateApi* by Keshav Soft and install it.

2. *Open an Empty Folder*
   - Create or open an empty folder in VS Code where you want the project to be generated.

3. *Generate Backend*
   - Open the *Command Palette* (Ctrl+Shift+P / Cmd+Shift+P on Mac).
   - Type and select commandArray (OnlyBackEnd).
   - You will see available options like *Generate*. Choose the desired option.
   - All the necessary files and folders will be copied to your empty folder.

---

## *Configuration*

- **.env file**  
  Define your configuration here:
  ```env
  DATA_PATH=your/data/path
  PORT=3000


## **Testing the API

- *Install REST API Client*

-- *Install REST API Client by Huachao Mao in VS Code.*

## Test Read Endpoint

*Navigate to: SV1 -> StudentsName -> Read -> RestClients -> 1.AsIs.http.*

1. Click the Send button

2. Ensure the backend is running on port 3000

3. You should receive a 200 OK response, confirming the server is running properly

## Test Insert Endpoint

*Go to: Insert -> 1.AsIs.http and create a new entry (e.g., a student name)*

1. After creating, go back to: Read -> RestClients -> 1.AsIs.http

2. Send the request again and you should see the recently created name in the response

## Verify Backend Functionality

*Repeat the Insert → Read process multiple times to verify that entries are correctly saved and retrieved*

1.  Make sure all requests return 200 OK, indicating the backend is running correctly

## Known Issues

- No known issues.

## Release Notes

### 0.1.1

- Initial release of the Sample Extension.

### 0.1.2

- Generate.FrontAndBack working good.

### 0.2.3

- package.json altered no errors to package

### 0.2.4

- data being posted good

### 0.3.2

- OnlyFrontEnd working good

### 0.4.1

- Async started...

### 0.5.1

- MongoDB. started...

### 0.6.1

- TokenTable good with secret...

### 0.6.2

- token delte working good

### 0.6.3

- Generate.FrontAndBackWithGulp .env moved to common

### 0.6.4

- Generate.FrontAndBackWithGulp UsersTable working good

### 0.7.1

- Generate.FrontAndBackWithGulp Secret and token in seperate folders

### 0.8.1

- Generate.FrontAndBackWithGulp User working good

### 0.8.2

- Generate.FrontAndBackWithGulp   "isAutoFocus": true working good

### 0.8.3

- LastRun folder started

### 0.8.4

- still working on group by...

### 0.8.5

- Group By working on rest files...

### 0.8.6

- Group By perfect

### 1.9.1

- mail perfect for registration

### 1.9.3

- GenerateWMail started...

### 1.9.4

- GenerateWMail.FrontAndBackWithGulp working perfect

### 1.9.5

- image also added

### 1.9.6

- folder added

### 1.9.7

- menu added for ui

### 1.9.8

- batch file changed

### 1.9.9

- for unique started

### 1.9.10

- .env changed

### 1.9.11

- register perfect with unique

### 1.10.1

- front end changed

### 1.10.2

- batch file hooked to new front repo

### 1.10.3

- schemas in folder

### 1.10.4

- schema defaultvalue added to tasks

### 1.10.5

- OnlyBackEnd good

### 1.11.1

- v10 bad

### 1.11.2

- v11 case changed for ubuntu

### 1.11.3

- readme is better

## License

MIT
