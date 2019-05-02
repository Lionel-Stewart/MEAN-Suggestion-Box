//Dependencies
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const passport       = require("passport");
const express        = require("express");
const cors           = require("cors");
const app            = express();

//Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

//Database
const database = require('./config/database').mongoURI;
mongoose
  .connect(database, {useNewUrlParser: true, ignoreUndefined: true})
  .then(() => {console.log("Connected to Database")})
  .catch(err => {console.log(err)});

//Routes 
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');

app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/suggestions', suggestionRoutes);

module.exports = app;