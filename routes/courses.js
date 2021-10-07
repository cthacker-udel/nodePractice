const express = require('express');
const router = express.Router();

const Joi = require('joi');

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

const schema = Joi.object({
    name: Joi.string().min(3).required()
});

router.get('/',(req,res) => {
    res.send(courses);
});

router.get('/:id',(req,res) => {
    const course = courses.find(e => e.id == parseInt(req.params.id));
    if(!course){
        res.status(404).send('Course unabled to be found with given id');
    }
    else{
        res.send(course);
    }
});

router.post('/',(req,res) => {
    
    const { error, value } = schema.validate(req.body);

    //console.log(error);
    //console.log(value);

    if(error){
        res.send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req,res) => {
    // lookup course
    const course = courses.find(e => e.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('Cannot find course');
        return;
    }

    const { error, value } = schema.validate(req.body);

    if(error){
        res.status(400).send(error.details);
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

router.delete('/:id',(req,res) => {

    // look up course
    const course = courses.find(e => e.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('Cannot find course');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

});

module.exports = router;