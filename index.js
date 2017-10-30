var express = require('express');
var logger = require("./logger");
var cors = require('cors');
var app = express();





app.set('port', (process.env.PORT || 5000));

app.use(logger);


app.use(cors());

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(1024, function () {
  console.log('CORS-enabled web server listening on port 1024')
})

app.use(express.static(__dirname + '/public'));

var adherents = JSON.parse(require('fs').readFileSync('./data/adherents.json', 'utf8'));

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

var entrees = JSON.parse(require('fs').readFileSync('./data/entrees.json', 'utf8'));
for (var index = 0; index < entrees.length; index++) {
    entrees[index].id = index;
    entrees[index].category = CATEGORIES[0];
}

var meals = JSON.parse(require('fs').readFileSync('./data/meals.json', 'utf8'));
for (var index = 0; index < meals.length; index++) {
    meals[index].id = index;
    meals[index].category = CATEGORIES[0];
}

var desserts = JSON.parse(require('fs').readFileSync('./data/desserts.json', 'utf8'));
for (var index = 0; index < desserts.length; index++) {
    desserts[index].id = index;
    desserts[index].category = CATEGORIES[0];
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

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

app.get('/services.html', function(req, res) {
    res.sendFile(__dirname + '/public/services.html');
});

app.get('/adherents', function(request, response) {
    var limit = request.query.limit;
    console.log('/adherents#' + adherents.length);
    if (limit != 0) {
        response.json(adherents.slice(0, limit));
    } else {
        response.json(adherents);
    }
});

app.get('/meals', function(request, response) {
    var limit = request.query.limit;
    console.log('/meals#' + meals.length);
    if (limit != 0) {
        response.json(meals.slice(0, limit));
    } else {
        response.json(meals);
    }
});


app.get('/desserts', function(request, response) {
    var limit = request.query.limit;
    console.log('/desserts#' + desserts.length);
    if (limit != 0) {
        response.json(desserts.slice(0, limit));
    } else {
        response.json(desserts);
    }
});


app.get('/entrees', function(request, response) {
    var limit = request.query.limit;
    console.log('/entrees#' + entrees.length);
    if (limit != 0) {
        response.json(entrees.slice(0, limit));
    } else {
        response.json(entrees);
    }
});