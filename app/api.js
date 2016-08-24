// load up the user model
var User = require('../app/models/user');

// load up the source model
var Source = require('../app/models/source');

module.exports = function (app) {

    // show all users
    app.get('/api/users', function (req, res) {
        req.temp = {};
        if(req.query.search != null && req.query.search != ''){
            req.temp = {'$text': { $search: req.query.search }};
        }
        User.find(req.temp,function (err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all users in JSON format
        });
    });

    // show all source
    app.get('/api/source', function (req, res) {
        req.temp = {};
        if(req.query.search != null && req.query.search != ''){
            req.temp = {'$text': { $search: req.query.search }};
        }
        Source.find(req.temp,function (err, source) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json({
                d: source,
                me: req.user._id
            }); // return all source in JSON format
        });
    });

    // insert a source
    app.post('/api/source', function (req, res) {
        var source = new Source({
            item: req.body.item,
            isbn: req.body.isbn,
            description: req.body.description,
            author: req.body.author,
            owner: req.user._id,
            access: []
        });
        source.save(function (err) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json({
                status: 1,
                message: 'success'
            }); // return success in JSON format
        });
    });
    
    function personalSource(req, res) {
        req.current_user_id = (req.params.id != undefined && req.params.id != '') ? req.params.id : req.user._id;
        req.temp = {'$or': [{
                    access: {
                        $elemMatch: {
                            $eq: req.current_user_id
                        }
                    }
                },
                {
                    owner: req.current_user_id
                }]};
        if(req.query.search != null && req.query.search != ''){
            req.temp = {
            '$and':[{'$or': [{
                    access: {
                        $elemMatch: {
                            $eq: req.current_user_id
                        }
                    }
                },
                {
                    owner: req.current_user_id
                }]},{'$text': { $search: req.query.search }}
                   ]            
            };
        }
        Source.find(req.temp, function (err, source) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json({
                d: source,
                me: req.user._id
            }); // return all source in JSON format
        });
    }

    // show all my source
    app.get('/api/users/personal/:id', personalSource);

    // show all my source
    app.get('/api/source/personal', personalSource);

    // show one source
    app.get('/api/source/personal/:id', function (req, res) {
        Source.find({
            _id: req.params.id
        }, function (err, source) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json({
                d: source
            }); // return all source in JSON format
        });
    });


    // update source
    app.put('/api/source/:id', function (req, res) {
        Source.findById(req.params.id, function (err, source) {

            if (err)
                res.send(err);
            if (source.owner == req.user._id) {
                source.item = req.body.item,
                    source.isbn = req.body.isbn,
                    source.description = req.body.description,
                    source.author = req.body.author

                // save the source
                source.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({
                        status: 1,
                        message: 'source updated!'
                    });
                });
            } else {
                if (source.access.indexOf(req.user._id) == -1) {
                    source.access.push(req.user._id); // update the source info

                    // save the source
                    source.save(function (err) {
                        if (err)
                            res.send(err);

                        res.json({
                            status: 1,
                            message: 'catalog added!'
                        });
                    });
                } else {
                    res.json({
                        status: 2,
                        message: 'Already exists!'
                    });
                }
            }

        });
    });

    // remove source
    app.delete('/api/source/personal/:id', function (req, res) {
        Source.remove({
            _id: req.params.id
        }, function (err) {
            if (err)
                res.send(err);

            res.json({
                status: 1,
                message: 'source removed!'
            });
        });
    });

};