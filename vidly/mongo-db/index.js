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
