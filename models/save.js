// Require mongoose
var mongoose = require("mongoose"); 

var Schema = mongoose.Schema;

// Get Article Schema
var SaveSchema = new Schema ({

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

	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

var Save = mongoose.model ("Save", SaveSchema);

// Export the model 
module.exports = Save;