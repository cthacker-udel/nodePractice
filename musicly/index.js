// OFFICIAL CONSTANTS

const express = require('express');

const Joi = require('joi');

const config = require('config');

const app = express();

const logger = require('./logger');
const auth = require('./authentication');
const morgan = require('morgan');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const port = process.env.PORT | 3000;

app.use(express.json());
//app.use(logger);
//app.use(morgan);
//app.use(auth);

const songSchema = Joi.object({

    title: Joi.string().min(1).required(),
    genre: Joi.string().min(1).required(),

});

const songs = [];

// OFFICIAL CONSTANTS

app.get('/api/songs',(req,res) => {

    if(songs.length === 0){
        return res.status(200).send({'Result': 'There are no songs stored in the database'});
    }
    else{
        return res.status(200).send(songs);
    }

});

app.get('/api/songs/:id',(req,res) => {

    const song = songs.find(e => e.id === parseInt(req.params.id));

    if(song === undefined){
        // song not found
        return res.status(404).send({'Result': 'Song unable to be found'});
    }
    else{
        return res.send(song);
    }

});

app.get('/api/songs/byGenre/:genreType',(req,res) => {

    const theSongs = songs.filter(e => e.genre.toLowerCase() === req.params.genreType.toLowerCase());

    if(theSongs.length === 0){
        return res.status(404).send(`No songs of genre ${req.params.genreType} in database`);
    }
    else{
        return res.send(theSongs);
    }

});

app.get('/api/songs/byTitle/:titleName',(req,res) => {

    const theSong = songs.find(e => e.title === req.params.titleName);

    if(theSong === undefined){
        return res.status(404).send(`The song with the title ${req.params.titleName} is unable to be found`);
    }
    else{
        return res.send(theSong);
    }

});

app.post('/api/songs',(req,res) => {

    const {error, value } = songSchema.validate(req.body);

    if(error){
        return res.status(400).send('Invalid song sent in body');
    }
    else{

        songs.push({
            id: songs.length+1,
            ...req.body
        });
        return res.status(200).send(req.body);

    }

});

app.put('/api/songs/:id',(req,res) => {

    const song = songs.find(e => e.id === parseInt(req.params.id));

    if(song === undefined){
        return res.status(404).send(`Unable to find song with id : ${req.params.id} in database`);
    }
    else{

        const { error, value } = musicSchema.validate(req.body);

        if(error){
            res.status(400).send('Invalid song object sent in body of request');
        }
        else{
            song.genre = req.body.genre;
            song.title = req.body.title;
        }

        return res.send(song);
    }

});

app.put('api/songs/byGenre/:genreType/:newGenre', (req,res) => {

    const genreSongs = songs.filter(e => e.genre === req.params.genreType);

    if(genreSongs.length === 0){
        return res.status(404).send(`Unable to find songs of the genre type ${req.params.genreType} in database`);
    }
    else{
        songs = songs.map(e => e.genre === req.params.genreType? e.genre = req.params.newGenre: e);
        return res.send(songs);
    }

});

app.delete('/api/songs/:id',(req,res) => {

    const song = songs.find(e => e.id === parseInt(req.params.id));

    if(song === undefined){
        return res.status(404).send(`Song with id ${req.params.id} unable to be found`);
    }
    else{
        const index = songs.findIndex(e => e.id === req.params.id);
        const deletedSong = songs.splice(index,1);
        return res.send(deletedSong);
    }

})




app.listen(port, () => {
    console.log(`listening on port ${port}`);
});