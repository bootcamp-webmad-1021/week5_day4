module.exports = (app) => {
  app.use("/", require("./base.routes"))
  app.use("/movies", require("./movies.routes"))
}