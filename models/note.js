var mongoose = require("mongoose"); 

// References Schema constructor
var Schema = mongoose.Schema;

// Create NoteSchema
var NoteSchema = new Schema ({

	article_id: {
		type: Schema.Types.ObjectId
	},
	body: {
		type: String
	}
});

// Create Note model so Mongoose can save ObjectId of notes that are referred to in Article model
var Note = mongoose.model("Note", NoteSchema);

// Exports Note model
module.exports = Note; 