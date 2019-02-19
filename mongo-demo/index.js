const mongoose = require('mongoose')

// Mongo creates db automatically if db does not exist :)))
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => console.log('Could not connect to MongoDB...', e))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now()},
    isPublished: Boolean
})

const Course = mongoose.model('Courses', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Tyler',
        tags: ['angular', 'frontend'],
        isPublished: true
    })

    const result = await course.save()
    console.log(result)
}

async function getCourses() {
    // Using this for demonstration
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({author: 'Tyler', isPublished: true})
        // .find({price: {$ge: 10, $lte: 20}})
        // .find({price: {$in: [10,15,20]}})
        // .find()
        // .or([{author: 'Tyler'}, {isPublished: true}])
        // .and([])
        // .find({author: /^Tyler/}) //Starts with Tyler
        // .find({author: /Tyler$/i}) // Ends with Tyler
        // .find({author: /.*Tyler.*/})// Contains Tyler
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1})
        .count()
    console.log(courses)
}

// Query first approach to updating documents
async function queryFirstUpdateCourse(id) {
    const course = await Course.findById(id)
    if (!course) return;
    course.isPublished = true
    course.author = 'Another Author'

    const result = await course.save()
    console.log(result)
}

// queryFirstUpdateCourse('5c6c176e3130a21c0489bb4f')

// Update first approach to updating documents
async function updateFirstUpdateCourse(id) {
    const course = await Course.findByIdAndUpdate(id,{
        $set: {
            author: 'Some kind of author',
            isPublished: false
        }
    },{new: true})
    console.log(course)
}

// updateFirstUpdateCourse('5c6c17afbd00263054531e3d')

// Remove course
async function removeCourse(id) {
    // const result = await Course.deleteMany({_id: id})
    const course = await Course.findByIdAndRemove(id)
    console.log(course)
}

removeCourse('5c6c17afbd00263054531e3d')
