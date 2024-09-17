require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {

  const person = new Person({ name: 'Benjamin', age: 23, favoriteFoods: ['Fried Chiken'] });

  person.save((err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });

};

const arrayOfPeople = [
  { name: "Benja C", age: 23, favoriteFoods: ['Fruit'] },
  { name: "Salva C", age: 32, favoriteFoods: ['N'] },
]

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })

};
const personName = 'Benja C';

const findPeopleByName = (personName, done) => {

  Person.find({ name: personName }, (err, data) => {
    if(err) return console.log(err);
    console.log(data);
    done(null, data);
  });

};

const food = 'Fruit';

const findOneByFood = (food, done) => {

  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
  
};

const personId = 1;

const findPersonById = (personId, done) => {

  Person.findById(personId, (err, data) => {
    if(err) return console.log(err);
    console.log(data);
    done(null, data);
  })
  
};

const findEditThenSave = (personId, done) => {

  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {

    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {

      if (err) return console.log(err);

      done(null, updatedPerson);

    })

  })

};

const findAndUpdate = (personName, done) => {

  const ageToSet = 20;
  const filter = { name: personName };
  const change = { age: ageToSet };
  

  Person.findOneAndUpdate(filter, change, { new: true }, (err, personUpdated) => {
    if (err) return console.log(err);
    done(null, personUpdated);
  })

  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return cpnsole.log(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {

  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, personRemoved) => {
    if (err) return console.log(err);
    done(null, personRemoved);
  })

};

const queryChain = (done) => {

  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if(err) return console.log(err);
      done(null, data);
    });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
