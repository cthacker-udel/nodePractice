const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

/*

Global schemas

*/

const movieSchema = Joi.object(

    {
        title: Joi.string().min(1).required(),
        genre: Joi.string().min(5).required(),
    }

);

const movies = [];

/*

REST endpoints

*/

// GET : list of movies
app.get('/api/movies',(req,res) => {

    if(movies.length > 0){
        res.status(200).send({'Result': movies});
    }
    else{
        res.send({'Result': []})
    }

});

// GET : list of genres
app.get('/api/genres',(req,res) => {

    res.status(200).send(movies.length > 0? {'Result': movies.map(e => e.genre)}: {'Result': []});

});

// POST : Add movie

app.post('/api/movies',(req,res) => {

    const { error, value } = movieSchema.validate(req.body);

    if(error){
        res.status(400).send(error.details);
        return;
    }

    const newMovie = {
        id: movies.length+1,
        ...req.body
    }
    movies.push(newMovie);
    res.send(req.body);
});

// PUT : update movie

app.put('/api/movies/:id',(req,res) => {

    const movie = movies.length > 0? movies.find(e => e.id === parseInt(req.params.id)): undefined;

    if(!movie){
        res.status(404).send({'Error': 'Unable to find movie with requested id'});
        return;
    }

    const { error, value } = movieSchema.validate(req.body);

    if(error){
        res.status(400).send(error.details);
        return;
    }

    movie.title = req.body.title;
    movie.genre = req.body.genre;


    res.send(req.body);

});

app.delete('/api/movies/:id',(req,res) => {

    const movie = movies.length > 0? movies.find(e => e.id === parseInt(req.params.id)): undefined;

    if(!movie){
        res.status(404).send({'Error': 'Unable to find movie with requested id'});
    }

    const { error, value } = movieSchema.validate(req.body);

    if(error){
        res.status(400).send(error.details);
        return;
    }

    const index = movies.indexOf(movie);
    movies.splice(index,1);
    res.send(movie);

});


app.listen(port,() => console.log(`Listening on port ${port}`));

