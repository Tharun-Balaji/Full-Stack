const mongoose = require('mongoose');

const password = "V1j8zaLh7ijqwEa2";

const url = "mongodb+srv://tharunbalaji110:V1j8zaLh7ijqwEa2@cluster0.yn8ddpk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(url)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch(err=> console.log(err));


//Schema

const courseSchema = new mongoose.Schema({
  name: String,
  creator: String,
  rating: Number,
  publishedDate: {
    type: Date,
    default: Date.now(),
  },
});


//Model

const Course = mongoose.model('Course',courseSchema);
// Created the collection in MongoDB
// and with the help of Model we will be able to create documents

async function createCourse(){
    const newCourse = new Course({
        name: "React",
        
        rating: 5,
    });
    const courseCreated = await newCourse.save();
    console.log(courseCreated);
}

// createCourse();

async function getCourse() {
  // find all documents
  const course = await Course.find({creator: "TharunBalaji"});
  console.log(course);
}

// getCourse();

// --------Update-------
async function updateCourse(id){
  const course = await Course.findById(id);
  if (!course) return;
  console.log(course);
  course.rating = 10;
  await course.save();

}

// updateCourse("6606808c9a659933b5636ee0");

// ----------------Delete--------------------

async function deleteCourse(id){
  const course = await Course.findByIdAndDelete(id);
  if (!course) return;
  console.log(course);
}

//  deleteCourse("6606808c9a659933b5636ee0");



