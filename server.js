// npm dependencies
const fs = require("fs");
const express = require("express");
const path = reqiure("path");

// initalize Express app
const app = express();
// set PORT , using port 3000 because we used it in the modules
const PORT = process.env.PORT || 3000;