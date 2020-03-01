import express from "express";
import compression from "compression";
import helmet from "helmet";
import favicon from "serve-favicon";
import logger from "morgan";
import dotenv from "dotenv";
import renderPage from "./renderPage";

var https = require('https')
// Load environment variables from .env file
dotenv.config();

const app = express();

// MongoClient.connect(process.env.MONGODB_URL).then(client => {
//   const db = client.db(process.env.MONGODB_NAME);

//   configurePassport(db);

var certOptions = {
  key: fs.readFileSync(path.resolve('build/cert/server.key')),
  cert: fs.readFileSync(path.resolve('build/cert/server.crt'))
};
app.use(helmet());
app.use(logger("tiny"));
app.use(compression());
app.use(favicon("build/public/favicons/favicon.ico"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// aggressive cache static assets (1 year)
app.use("/static", express.static("dist/public", {maxAge: "1y"}));

// Persist session in mongoDB
// app.use(
//   session({
//     store: new MongoStore({ db }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// );
app.use(passport.initialize());
app.use(passport.session());
// app.use("/auth", auth);
// app.use("/api", api(db));
// app.use(fetchBoardData(db));
app.use(fetchBoardData());
app.get("*", renderPage);

const port = process.env.PORT || "1337";
/* eslint-disable no-console */
var server = https.createServer(certOptions, app).listen(port, () => {
});
