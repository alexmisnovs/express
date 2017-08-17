const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

// middleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// middleware logging
app.use((req, res, next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');

    next();
});

// app.use((req, res, next) => {
    
//     res.render('underconstruction.hbs', {
//         pageTitle: 'Under Construction',
//         message: 'Site will be back up shortly',
//         array: [1, 2, 3, 4, 5, 6, 7]
//     });
// });


app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) => {
    
        res.render('about.hbs', {
            pageTitle: 'About Page',
           
        });
    });

app.get('/', (req, res) => {

    res.render('home.hbs', {
        // can use nested objects
        jumboTron: {
            heading: 'Welcome to Express dynamic site',
            content: 'blah blah'
        },
        pageTitle: 'Home Page',
        messageToScream: 'This is my message to scream it out'
    });

});
app.get('/json', (req, res) => {
        var obj = {
            name: 'alex',
            description: 'this is description',
            city: 'burton on trent',
            likes: {
                food: 'potato',
                drink: 'coffee'
            },
            dislikes: [
                'gaming',
                'chavs'
            ]
        }
        res.send(obj);
    
    });
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        content: "<p>This is the projects page content</p>"
    });
});


app.get('/bad', (req, res) => {
    var error = {
        errorMessage: 'Something went wrong'
    }
    res.send(error);
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});