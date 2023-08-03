const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose.connect("mongodb://127.0.0.1:27017/recipe-app");

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Lubina al horno",
      level: "Amateur Chef",
      ingredients: [
        "Lubina salvaje",
        "Patatas",
        "Cebolla",
        "Ajo",
        "Aceite",
        "Vinagre",
      ],
      cuisine: "Mediterranea",
      thisType: "main_course",
      image:
        "https://i.blogs.es/d40988/lubina-al-horno-mas-facil-del-mundo-pakus-directo-paladar-2-/1366_2000.jpg",
      duration: 45,
      creator: "Uriel",
    }).then((response) => {
      console.log(response.title);
    });
  })
  .then(() => {
    return Recipe.insertMany(data)
      .then((response) => {
        response.forEach((eachRecipe) => {
          console.log(eachRecipe.title);
        });
      })
      .then(() => {
        return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
      })
      .then(() => {
        return Recipe.deleteOne({title: "Carrot Cake"})
      })
  })
  .then((response)=> {
    return mongoose.connection.close()
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
