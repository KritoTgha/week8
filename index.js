// Importing Mongoose library
const mongoose = require('mongoose');

// MongoDB URI (change if you're using a cloud MongoDB like MongoDB Atlas)
const MONGO_URI = 'mongodb://localhost:27017/Week8';

// Connecting to MongoDB
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', function(err) {
    console.log("Error occurred during connection: " + err);
});
db.once('connected', function() {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
});

// Define a Schema for the Person collection
const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    gender: String,
    salary: Number
});

// Define a Model based on the schema
const Person = mongoose.model('Person', PersonSchema, 'personCollection');

// Task 1: Adding a single document
const doc1 = new Person({
    name: 'Jacky',
    age: 36,
    gender: 'Male',
    salary: 3456
});

doc1.save()
    .then((doc) => {
        console.log("New document added:", doc);
    })
    .catch((err) => {
        console.error("Error adding document:", err);
    });

// Task 2: Adding multiple documents
const manyPersons = [
    { name: 'Simon', age: 42, gender: "Male", salary: 3456 },
    { name: 'Neesha', age: 23, gender: "Female", salary: 1000 },
    { name: 'Mary', age: 27, gender: "Female", salary: 5402 },
    { name: 'Mike', age: 40, gender: "Male", salary: 4519 }
];

Person.insertMany(manyPersons)
    .then(() => {
        console.log("Multiple documents inserted");
    })
    .catch((error) => {
        console.error("Error inserting documents:", error);
    });

// Task 3: Fetching all documents
Person.find({})
    .limit(5)
    .then(docs => {
        console.log("Fetched documents:", docs);
    })
    .catch(err => {
        console.error("Error fetching documents:", err);
    });

// Task 4: Filtering documents by gender and age
const givenAge = 25;
Person.find({ gender: "Female", age: { $gte: givenAge } })
    .then(docs => {
        console.log(`Female persons with age greater than ${givenAge}:`);
        docs.forEach(doc => {
            console.log(doc.name, doc.age);
        });
    })
    .catch(err => {
        console.error("Error fetching filtered documents:", err);
    });

// Task 5: Counting the total number of documents
Person.countDocuments()
    .then(count => {
        console.log("Total documents count:", count);
    })
    .catch(err => {
        console.error("Error counting documents:", err);
    });

// Task 6: Deleting documents with age >= 25
Person.deleteMany({ age: { $gte: 25 } })
    .then(result => {
        console.log('Deleted documents:', result);
    })
    .catch(err => {
        console.error('Error deleting documents:', err);
    });

// Task 7: Updating salary for all females
Person.updateMany({ gender: 'Female' }, { salary: 5555 })
    .then(result => {
        console.log("Updated documents:", result);
    })
    .catch(err => {
        console.error("Error updating documents:", err);
    });
