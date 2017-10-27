var express = require("express");
var app = express();
var logger = require("./logger");

const CATEGORIES = [{
        name: "Entree",
        id: 0
    },
    {
        name: "Meal",
        id: 1
    },
    {
        name: "Dessert",
        id: 3
    }
]

var entrees = JSON.parse(require('fs').readFileSync('entrees.json', 'utf8'));
var i=0
for (const item of entrees) {
    item.id = i;
    item.category = 
}

var meals = JSON.parse(require('fs').readFileSync('meals.json', 'utf8'));
var i=0
for (const item of meals) {
    item.id = i;
}

var desserts = JSON.parse(require('fs').readFileSync('desserts.json', 'utf8'));
var i=0
for (const item of desserts) {
    item.id = i;
}


const STATUS = [{
        status: "New",
        id: 0
    },
    {
        status: "Pending",
        id: 1
    },
    {
        status: "Doing",
        id: 2
    },
    {
        status: "Cancel",
        id: 3
    },
    {
        status: "Ready",
        id: 4
    },
    {
        status: "Done",
        id: 5
    }
]


app.use(logger);


app.listen(3000, function() {
    console.log("app listening on port 3000 ! ");
});

app.use(function(req, res, next) {
    console.log('Time:', Date.now());
    console.log('Methode HTTP: ' + req.method);
    next();
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/cities.html');
});

app.get('/cities', function(request, response) {
    var limit = request.query.limit;
    if (limit != 0) {
        response.json(cities.slice(0, limit))
    } else {
        response.json(cities);
    }
});

app.get('/cities/:id', function(request, response) {
    var limit = request.query.limit;
    if (request.params.id != 0) {
        response.json(cities.slice(request.params.id - 1, request.params.id));
    }

    if (limit != 0) {
        response.json(cities.slice(0, limit))
    } else {
        response.json(cities);
    }

});

app.param('year', function(request, response, next) {
    if (isYearFormat(request.params.year)) {
        next();
    } else {
        response.status(400).json('Invalid Format for Year');
    }
});

var citiesYear = {
    5000: 'Lotopia',
    5100: 'Caspiana',
    5100: 'Indigo',
    6000: 'Paradise',
    7000: 'Flotilla'
};

function isYearFormat(value) {
    var regexp = RegExp(/^\d{4}$/);
    return regexp.test(value);
}

app.get('/cities/year/:year', function(request, response) {
    var year = request.params.year;
    var city = citiesYear[year];

    if (!city) {
        response.status(404).json("No City found for given year");
    } else {
        response.json("In " + year + ", " + city + " is created.");
    }

});

app.get('/Books', function(request, response) {
    response.sendFile(__dirname + '/books.json');

});