const express = require("express");
const todoRoutes = require("./todo");

module.exports = (app) => {
    app.use(express.json());
    app.use(
        express.urlencoded({
        extended: false,
        })
    );
    
    // Specify the Routes
    app.use("/", todoRoutes);
}