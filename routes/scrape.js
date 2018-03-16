// Call (require) dependencies to run the scrape

var request = require("request");
var cheerio = require("cheerio");

// Require the models
var Article = require("../models/Article.js");
var Save = require("../models/Save.js");
var Note = require("../models/Note.js");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        request("https://www.foreignaffairs.com/", function (error, response, html) {

            
            var $ = cheerio.load(html);

          
            $("article.story").each(function (i, element) {
                var result = {};
                 
                result.summary = $(element).children("p.summary").text();
                result.byline = $(element).children("p.byline").text();
                result.title = $(element).children("h2").text();
                result.link = $(element).children("h2").children("a").attr("href");
                
                if (result.title && result.link) {
                    var entry = new Article(result);
                    // Now, save that entry to the db
                    Article.update(
                        {link: result.link},
                        result,
                        { upsert: true },
                        function (error, doc){
                            if (error) {
                                console.log(error);
                            }
                        }
                    );
                }
            });
            res.json({"code" : "success"});
            // res.json(true);
        });
    });

    // Get route for all articles
    app.get("/articles", function (req, res) {
    	Article.find({}, function (error, doc) {
    		if (error) {
    			console.log(error);
    		} else {
    			res.send(doc);
    		}
    	});
    });

    // Get route for the article ids
    app.get("/articles/:id", function (req, res) {
        Article.find({
                "_id": req.params.id
            })
            .populate("note")
            .exec(function (error, doc) {
                if (error) {
                    console.log(error)
                } else {
                    res.send(doc);
                }
            });
    });

    // Get route for the saved articles
     app.get("/saved/all", function (req, res) {
        Save.find({})
            .populate("note")
            .exec(function (error, data) {
                if (error) {
                    console.log(error);
                    res.json({"code" : "error"});
                } else {
                    res.json(data);
                }
            });
    });

     // Post route that saves the article
     app.post("/save", function (req, res) {
        var result = {};
        result.id = req.body._id;
        result.summary = req.body.summary;
        result.byline = req.body.byline;
        result.title = req.body.title;
        result.link = req.body.link;
         
        var entry = new Save(result);
         
        entry.save(function (err, doc) {
            // Log any errors
            if (err) {
                console.log(err);
                res.json(err);
            }
            
            else {
                res.json(doc);
            }
        });
        
    });

     // Delete route to remove saved articles
     app.delete("/delete", function (req, res) {
        var result = {};
        result._id = req.body._id;
        Save.findOneAndRemove({
            '_id': req.body._id
        }, function (err, doc) {
            // Log any errors
            if (err) {
                console.log("error:", err);
                res.json(err);
            }
            // Or log the doc
            else {
                res.json(doc);
            }
        });
    });

     app.get("/notes/:id", function (req, res) {
        if(req.params.id) {
            Note.find({
                "article_id": req.params.id
            })
            .exec(function (error, doc) {
                if (error) {
                    console.log(error)
                } else {
                    res.send(doc);
                }
            });
        }
    });

     // Post route to add a new note.
     app.post("/notes", function (req, res) {
        if (req.body) {
            var newNote = new Note(req.body);
            newNote.save(function (error, doc) {
                if (error) {
                    console.log(error);
                } else {
                    res.json(doc);
                }
            });
        } else {
            res.send("Error");
        }
    });
    // find and update the note
    app.get("/notepopulate", function (req, res) {
        Note.find({
            "_id": req.params.id
        }, function (error, doc) {
            if (error) {
                console.log(error);
            } else {
                res.send(doc);
            }
        });
    });

    // Delete route to remove notes
     app.delete("/deletenote", function (req, res) {
        var result = {};
        result._id = req.body._id;
        Note.findOneAndRemove({
            '_id': req.body._id
        }, function (err, doc) {
            
            if (err) {
                console.log("error:", err);
                res.json(err);
            }
            
            else {
                res.json(doc);
            }
        });
    });
}