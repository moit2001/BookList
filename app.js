if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
const express = require("express"); 
const expressLayouts = require("express-ejs-layouts");
const app = express();
// const indexRoutes = require("./routes/index");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const authoRouter = require("./routes/authors");

app.set("view engine" , "ejs");
app.set("views" , __dirname + "/views" );
app.set("layout" , "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit : '10mb' , extended : false }))

mongoose.connect(process.env.DATABASE_URL , { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true  })
const db = mongoose.connection;
db.on("error" , error => console.error(error));
db.once("open" , () => console.log("Connected to Mongoose "));

app.use("/" , indexRouter);
app.use("/authors" , authoRouter);


app.listen(process.env.PORT || 3000);