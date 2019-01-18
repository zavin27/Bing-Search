let express = require('express');
let passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;
let verifyToken = require("../common/verifyToken");
let models = require('../models');
let bcrypt = require('bcrypt');
let jwt = require("jsonwebtoken");

let router = express.Router();

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        models.User.findOne({where: {username: username}}).then(user => {
            bcrypt.compare(password, user.password, function (err, res) {
                if (err) {
                    return done(err);
                }
                if (!res) {
                    return done(null, false, {message: 'Invalid Password'});
                } else {
                    return done(null, user);
                }
            });
        }).catch(error => {
            return done(error);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    models.User.findById(id).then(user => {
        done(null, user);
    }).catch(error => {
        done(error, null);
    });
});

/**
 * User Login api endpoint
 * URL = /login
 */
router.post('/login', passport.authenticate('local'), (req, res) => {
    jwt.sign({user: req.user}, process.env.SECRET_KEY, {expiresIn: '24h'}, (err, token) => {
        res.status(200).json({
            access_token: token,
            userId: req.user.id,
            username: req.user.username
        });
    });
});

/**
 * Register New User api endpoint
 * URL = /register
 */
router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        models.User.create({
            username: req.body.username,
            password: hash
        }).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(400).json({
                error
            });
        });
    });
});
/**
 * Log User out
 * URL = /logout
 */
router.post('/logout', (req, res) => {
    req.logout();
    
    res.status(200).json({
        message: 'successfully logged out'
    });
});

router.get('/', verifyToken, (req, res) => {
    let authData = req.authData;
    res.status(200).json({
        authData
    });
});

module.exports = router;
