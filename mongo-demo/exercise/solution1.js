const mongoose = require('mongoose')

// Mongo creates db automatically if db does not exist :)))
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => console.log('Could not connect to MongoDB...', e))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now()},
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Courses', courseSchema)

async function getCourses() {
    const courses = await Course
        .find({isPublished: true, tags: 'backend'})
        .sort({name: 1})
        .select({name: 1, author: 1})
    console.log(courses)
}

getCourses()
