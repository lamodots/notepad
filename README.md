##Planning Phase
The design: https://www.figma.com/proto/U16JrUuoJzqfjCYfdZZ9kg/Untitled?type=design&node-id=1-3&t=wAWUNLSN4vYdXsT2-0&scaling=scale-down&page-id=0%3A1

##The boiler plate
Step 1 - Install Typescript

`
tsc --init
`

Stpe 2  -  Intialize package.json

`
    npm init
`

Step 3 - Intall webpack and other dependemcies
`
    npm install webpack webpack-cli ts-loader -D
`

Step 4 - Install Typescript locally
`
    npm install typescript -D
`

Step 5 - Creating Folders
`
-public
    - index.html
-src
    - index.ts
    `
Step 6 - Create a webpack config

by creating webpack.config.js file.

Step 7- Create a script command in package.json
`"build": "webpack",`

Step 8 : Compile TS by runing build command

`npm run build`


Step 9 - Install webpack server: so we can preview code
`npm install webpack-dev-server`

Step 10 - Create a script to run webpack server
`"serve": "webpack-dev-server",`

Step 11:  Start dev server
`npm run serve`

Step 12 - Create a public path in webpack config file to enable typescript rebuild our code

 output: {
    // Other codes

    publicPath: 'public',
  },


step 13: Making ES6 Module  work
Go to the webpack config file and add a resolve property
`resolve: {
    
    extensions: ['.ts', '.js', '.png', '.jpg', '.jpeg', '.svg', '.css'],
  },`

  CRUD

  Create
  Read
  Update
  Delete

  json
  migrant

  # notepad
