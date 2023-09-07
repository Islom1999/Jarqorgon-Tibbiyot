const express = require('express')
const path = require('path')
const {engine} = require('express-handlebars')
//  REQUIRE DB function
const configDB = require('./configDB/config')
// session registry
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
// 
const helpers = require('./utils/hbsHelpers')
const Handlebars = require('handlebars')

require('dotenv').config()

// server configuration
const server = express()

// DB configuration 
configDB()

// JSON configuration
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// HBS configuration
server.engine('.hbs', engine({extname: '.hbs'}))
server.set('view engine', '.hbs')

// session configuration
const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.MONGO_URI
})
server.use(session({
    secret: process.env.SECTION_SECRET,
    resave: false, 
    saveUninitialized: false,
    store
}))

//Register handlebars helpers
helpers(Handlebars)

// STATIC FILES configuration
server.use(express.static( path.join(__dirname, 'public') ))

// Router configuration
server.use('/', require('./routers/pagesRouters'))


// SERVER LISTENING configuration
const PORT = process.env.PORT || 5000
server.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server is running on port ${PORT}`)
    }
})





