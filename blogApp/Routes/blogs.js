const express = require('express');
const routes = express.Router();

// import controller
const { createBlog } = require("../Controllers/createBlog");
const { getBlog, getBlogById } = require("../Controllers/getBlog");
const { updateBlog } = require("../Controllers/updateBlog");
const { deleteBlog } = require("../Controllers/deleteBlog");

// define API routes
routes.post("/createBlog", createBlog);
routes.get("/getBlog", getBlog);
routes.get("/getBlog/:id", getBlogById);
routes.put("/updateBlog/:id", updateBlog);
routes.delete("/deleteBlog/:id", deleteBlog);

module.exports = routes;
