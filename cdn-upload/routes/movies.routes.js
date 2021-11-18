const router = require("express").Router();
const Movie = require('../models/Movie.model');

const fileUploader = require('../config/cloudinary.config');

/* GET home page */

// 1. Instrucciones: Crear el form para enviar la imagen
router.get("/create", (req, res, next) => res.render("movie-views/movie-create"))


// 4. Instrucciones: insertar el middleware en aquella ruta dónde se vaya a
//    subir una imagen.
// el 'movie-cover-image' hace referencia al name del input
router.post("/create", fileUploader.single('movie-cover-image'), (req, res) => {
  const { title, description } = req.body
  console.log("El req.body", req.body)

  //5. Instrucciones: rescatar del req.file el path a la imagen ya subida.
  console.log("El req.file: ", req.file)

  Movie.create({ title, description, imageUrl: req.file.path })
    .then(newlyCreatedMovieFromDB => {
      console.log(newlyCreatedMovieFromDB);
    })
    .catch(error => console.log(`Error while creating a new movie: ${error}`));
})


router.get('/', (req, res) => {
  Movie.find()
    .then(moviesFromDB => {
      // console.log(moviesFromDB);
      res.render('movie-views/movies-list.hbs', { movies: moviesFromDB });
    })
    .catch(err => console.log(`Error while getting the movies from the DB: ${err}`));
});


module.exports = router;
