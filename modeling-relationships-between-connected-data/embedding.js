const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: {
        type: authorSchema,
        required: true
    }
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

/* In order to update the child when it is embedded can do one of two things:
 1. Update at the parent level (technically when a document is embedded its always
 updated through the parent)
 */
async function updateAuthorFromParent(courseId) {
    const course = await Course.findById(courseId)
    course.author.name = 'Tyler Reece'
    course.save()
}

// 2. Update it directly
async function updateAuthorDirectly(courseId) {
    const course = await Course.update({_id: courseId}, {
        $set: {
            'author.name': 'John Smith'
        }
    })
    course.save()
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));
// updateAuthorFromParent('5c6d5865b9851e29147c2f5c')
updateAuthorDirectly('5c6d5865b9851e29147c2f5c')
