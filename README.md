# Viviputrada
# Visualizing Vienna's Public Transport Data

## Install
Install gulp globally ...
```
$ npm install gulp -g
```
... and install the project setup
```
$ npm install
```

## App
The distribution files are generated in the `/dist` folder.

### View the App
To 
- **build** the app, 
- **watch** the source files, and  
- start a **server**, 

run ...
```
$ gulp app
```
Then open **`http://localhost:8000`** in your browser.

(The files will be recompiled on change, but you need to reload the browser manually to see the changes)

### Watch the App
To 
- **build** the app,
- **watch** the source files,  
- start a **server**, and
- **livereload** the browser on-change of the files,

run ...
```
$ gulp connect
```
Then open **`http://localhost:8001`** in your browser.

### Build the App
To build the app without starting a watcher and server, run
```
$ gulp build
``` 
(This will also generate the JSDoc documentation)

## JSDoc
The documentation is generated in the `/docs` folder.

### View the Docs
To 
- **build** the docs and 
- start a **server**, 

run ...
```
$ gulp doc
```
Then open **`http://localhost:8002`** in your browser.

### Watch the Docs
To 
- **build** the docs,
- **watch** the js files,  
- start a **server**, and
- **livereload** the browser on-change of the files

run ...
```
$ gulp live-doc
```
Then open **`http://localhost:8003`** in your browser.

### Build the Docs
To only generate the JSDoc documentation without starting a watcher and server, run
```
$ gulp build-doc
```
