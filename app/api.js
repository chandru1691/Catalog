// load up the user model
var User = require('../app/models/user');

// load up the source model
var Source = require('../app/models/source');

module.exports = function (app) {

    // show all users
    app.get('/api/users', function (req, res) {
        User.find(function (err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all users in JSON format
        });
    });

    // show all source
    app.get('/api/source', function (req, res) {
        Source.find(function (err, source) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            
            res.json({d:source,me:req.user._id}); // return all source in JSON format
        });
    });

    // show all my source
    app.get('/api/source/personal', function (req, res) {
        Source.find({
            access: {
                $elemMatch:{$eq: req.user._id}
            }
        }, function (err, source) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(source); // return all source in JSON format
        });
    });


    // update source
    app.put('/api/source/:id/', function (req, res) {
        Source.findById(req.params.id, function (err, source) {

            if (err)
                res.send(err);
            if (source.access.indexOf(req.user._id) == -1) {
                source.access = source.access.push(req.user._id); // update the source info

                // save the source
                source.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({
                        message: 'source updated!'
                    });
                });
            } else {
                res.json({
                    message: 'Already exists!'
                });
            }

        });
    });

};