const mongoose = require('mongoose')

// Mongo creates db automatically if db does not exist :)))
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => console.log('Could not connect to MongoDB...', e))

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: { // Async validator
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0
                    callback(result)
                }, 4000)
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: {type: Date, default: Date.now()},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { // need to use this function because arrow functions dont carry 'this value'
            return this.isPublished
        },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
})

const Course = mongoose.model('Courses', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: '-',
        author: 'Tyler',
        tags: [],
        isPublished: true,
        price: 10
    })
    try {
        const result = await course.save()
        console.log(result)
    } catch (e) {
        for (field in e.errors)
            console.log(e.errors[field].message)
    }
}

createCourse()

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
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Some kind of author',
            isPublished: false
        }
    }, {new: true})
    console.log(course)
}

// updateFirstUpdateCourse('5c6c17afbd00263054531e3d')

// Remove course
async function removeCourse(id) {
    // const result = await Course.deleteMany({_id: id})
    const course = await Course.findByIdAndRemove(id)
    console.log(course)
}

// removeCourse('5c6c17afbd00263054531e3d')
