const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
    author: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
      .populate('author', 'name -_id') // Lets mongo know to query the Author schema and show name but not id the
                                       // problem that can happen here is if there is bad data (i.e. the author id
                                       // is nowhere to be found) then the author will show up as null
      .populate('category', 'name')
    .select('name author');
  console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', '5c6d542866bbb91e1414e982')

listCourses();