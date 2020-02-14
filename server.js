
const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
const database = JSON.parse(fs.readFileSync('./db.json'))


server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token 
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({ username, password }) {
    return userdb.users.findIndex(user => user.username === username && user.password === password) !== -1
}

function checkIsAdmin({ username, password }) {
    return userdb.users.find(user => user.username === username && user.password === password).isAdmin;
}

// Register New User
server.post('/auth/register', (req, res) => {
    console.log("register endpoint called; request body:");
    console.log(req.body);
    const { username, password, firtsName, lastName } = req.body;

    if (userdb.users.find(user => user.username === username)) {
        const status = 401;
        const message = 'Username already exist';
        res.status(status).json({ status, message });
        return
    }

    var last_item_id = userdb.users[userdb.users.length - 1].id;
    userdb.users.push({ id: last_item_id + 1, username: username, password: password, firtsName: firtsName, lastName: lastName, isAdmin: false });

    fs.readFile("./users.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({ status, message })
            return
        };

        // Get current users data
        var data = JSON.parse(data.toString());

        //Add new user
        data.users.push({ id: last_item_id + 1, username: username, password: password, firtsName: firtsName, lastName: lastName, isAdmin: false }); //add some data
        var writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {  // WRITE
            if (err) {
                const status = 401
                const message = err
                res.status(status).json({ status, message })
                return
            }
        });
    });

    // Create token for new user
    const access_token = createToken({ username, password })
    console.log("Access Token:" + access_token);
    res.status(200).json({ access_token })
})

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
    console.log("login endpoint called; request body:");
    console.log(req.body);
    const { username, password } = req.body;
    if (isAuthenticated({ username, password }) === false) {
        const status = 401
        const message = 'Incorrect username or password'
        res.status(status).json({ status, message })
        return
    }
    const isAdmin = checkIsAdmin({ username, password });
    const access_token = createToken({ username, password, isAdmin })
    console.log("Access Token:" + access_token);
    res.status(200).json({ access_token })
})

server.get('/movies', (req, res) => {
    console.log('Get movies');
    const movies = database.movies;
    res.status(200).json({ movies });
});

server.get('/movies/:id', (req, res) => {
    let id = req.params.id;
    console.log('Get movie by id ' + id);
    const movie = database.movies.find(movie => movie.movieId === +id);
    if (!movie || movie === undefined) {
        const status = 404
        const message = 'Movie not found'
        res.status(status).json({ status, message })
        return
    }
    res.status(200).json({ movie });
});

server.post('/movies', (req, res) => {
    const movie = req.body;
    console.log('create movie')
    var last_item_id = database.movies.length;
    movie.movieId = last_item_id + 1;
    database.movies.push(movie);
    fs.readFile("./db.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({ status, message })
            return
        };

        // Get current users data
        var data = JSON.parse(data.toString());

        //Add new user
        data.movies.push(movie); //add some data
        var writeData = fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
            if (err) {
                const status = 401
                const message = err
                res.status(status).json({ status, message })
                return
            }
        });
    });
    res.status(200).json(true)
})

server.put('/movies', (req, res) => {
    const movie = req.body;
    console.log('update movie')
    const movieIndex = database.movies.findIndex(moviedb => moviedb.movieId === movie.movieId);
    if (movieIndex === -1) {
        const status = 404
        const message = 'Movie not found'
        res.status(status).json({ status, message })
        return
    }

    database.movies.splice(movieIndex, 1, movie)

    fs.readFile("./db.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({ status, message })
            return
        };

        // Get current users data
        var data = JSON.parse(data.toString());

        //Add new user
        data.movies.splice(movieIndex, 1, movie); //add some data
        var writeData = fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
            if (err) {
                const status = 401
                const message = err
                res.status(status).json({ status, message })
                return
            }
        });
    });
    res.status(200).json(true)
})

server.delete('/movies/:id', (req, res) => {
    let id = req.params.id;
    console.log("Delete by id ", id);
    const movieIndex = database.movies.findIndex(movie => movie.movieId === +id);
    if (movieIndex === -1) {
        const status = 404
        const message = 'Movie not found'
        res.status(status).json({ status, message })
        return
    }
    //remove from instance that is in this file
    database.movies.splice(movieIndex, 1);

    //remove from file
    fs.readFile("./db.json", (err, data) => {
        if (err) {
            const status = 401
            const message = err
            res.status(status).json({ status, message })
            return
        };

        // Get current users data
        var data = JSON.parse(data.toString());

        data.movies.splice(movieIndex, 1);
        for (let i = 0; i < data.movies.length; i++) {
            data.movies[i].movieId = i + 1;
            database.movies[1].movieId = i + 1;
        }
        var writeData = fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {  // WRITE
            if (err) {
                const status = 401
                const message = err
                res.status(status).json({ status, message })
                return
            }
        });
    });

    res.status(200).json(true)
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401
        const message = 'Error in authorization format'
        res.status(status).json({ status, message })
        return
    }
    try {
        let verifyTokenResult;
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if (verifyTokenResult instanceof Error) {
            const status = 401
            const message = 'Access token not provided'
            res.status(status).json({ status, message })
            return
        }
        next()
    } catch (err) {
        const status = 401
        const message = 'Error access_token is revoked'
        res.status(status).json({ status, message })
    }
})

server.use(router)

server.listen(8000, () => {
    console.log('Run Auth API Server')
})