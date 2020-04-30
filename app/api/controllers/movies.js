const movieModel = require('../models/movies');
module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        movieModel.findById(req.params.movieId, function (err, movieInfo) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "Movie found!!!", data: { movies: movieInfo } });
            }
        });
    },
    getAll: function (req, res, next) {
        let moviesList = [];
        var pageNo = parseInt(req.query.pageNo);
        var size = parseInt(req.query.size)
        if( isNaN(size) || size> 5 ){
            size=10;// max pageSize
        }
        if ( !isNaN(pageNo) && (pageNo < 0 || pageNo === 0) ) {
            response = { "error": true, "message": "invalid page number, should start with 1" };
            return res.json(response)
        }
        
        var query = {}
        query.skip = size * (pageNo - 1)
        query.limit = size

        //const numOfProducts = await movieModel.count({});
       
        //console.log(numOfProducts);
        const foundProducts = movieModel.find({},{},query, function (err, movies) {
            if (err) {
                next(err);
            } else {
                for (let movie of movies) {
                    moviesList.push({ id: movie._id, name: movie.name, released_on: movie.released_on });
                }
                movieModel.count({},function(err,totalCount) {
                    if(err) {
                      response = {"error" : true,"message" : "Error fetching data"}
                    }else{
                        var totalPages = Math.ceil(totalCount / size);
                        res.json({ status: "success", message: "Movies list found!!!", data: { movies: moviesList },pages:totalPages });
                    }
                });
            }
        });
    },
    updateById: function (req, res, next) {
        movieModel.findByIdAndUpdate(req.params.movieId, { name: req.body.name }, function (err, movieInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Movie updated successfully!!!", data: null });
            }
        });
    },
    deleteById: function (req, res, next) {
        movieModel.findByIdAndRemove(req.params.movieId, function (err, movieInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Movie deleted successfully!!!", data: null });
            }
        });
    },
    create: function (req, res, next) {
        movieModel.create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Movie added successfully!!!", data: null });

        });
    },
}