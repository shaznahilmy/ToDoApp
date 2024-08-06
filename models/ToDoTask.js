//This creates the MongoDB collection schema and export it for use in index.js.
/*
A MongoDB schema defines the data structure of the MongoDB documents i.e., the fields stored in each document along with validation requirements & 
default values.
• Schemas are compiled into models which are then mapped to documents.
• A MongoDB model represents a collection of documents in the DB that you can search.
• The model represents a collection of documents that follows the schema structure.
• Documents are individual instances attached to a model
*/
const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
content: {
type: String,
required: true
},
date: {
type: Date,
default: Date.now
}
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);