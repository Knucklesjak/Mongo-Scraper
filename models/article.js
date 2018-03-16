var mongoose = require("mongoose"); 

// Reference to the Schema constructor
var Schema = mongoose.Schema;


// Create article Schema that explains layout of items being scraped
var ArticleSchema = new Schema({

	title: {
		type: String,
		required: true
	},

	link: {
		type: String,
		required: true
	},

	summary: {
		type: String,
	},

	byline: {
		type: String, 
	},

	note: [{
		type: Schema.Types.ObjectId,
		ref: "Note"
	}]
});

var Article = mongoose.model("Article", ArticleSchema);

// Exports the Article model
module.exports = Article;