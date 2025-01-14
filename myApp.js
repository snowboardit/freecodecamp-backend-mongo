// Imports
const mongoose = require("mongoose");

// Local imports
const personSchema = require("./schemas/person")

// Constants
const URI = process.env.MONGO_URI,
  MONGOOSE_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

// Mongoose setup
mongoose.connect(URI, MONGOOSE_OPTIONS, () => {
  console.log('Connected!')
});

let Person = mongoose.model('Person', personSchema);

function createAndSavePerson(done) {
  const person = new Person({
    name: 'Jane Fonda',
    age: 84,
    favoriteFoods: ['Apples', 'Cake', 'Blackberries']
  })
  person.save((err, data) => {
    if (err) console.error(err)
    console.log({ data });
    done(null, data);
  })
};

async function createManyPeople(arrayOfPeople, done) {
  const people = await Person.create(arrayOfPeople, (err, data) => {
    if (err) console.error(err)
    console.log({ data });
    done(null, data);
  });
  console.log({ people })
}

const findPeopleByName = (personName, done) => {
  const search = { name: personName };
  Person.find(search, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  const search = { favoriteFoods: food };
  Person.findOne(search, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  })
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger",
    person = await Person.findById(personId, (err, data) => {
      if (err) console.error(err);
    });

  person.favoriteFoods.push(foodToAdd);

  await person.save((err, data) => {
    if (err) console.error(err);
    done(null, data)
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20,
    search = { name: personName },
    update = { age: ageToSet },
    options = { new: true, useFindAndModify: false };
  Person.findOneAndUpdate(search, update, options, (err, data) => {
    if (err) console.error(err);
    console.log({ data });
    done(null, data)
  })
};

const removeById = async (personId, done) => {
  const options = { useFindAndModify: false };
  await Person.findByIdAndRemove(personId, options, (err, data) => {
    if (err) console.error(err);
    console.log(data)
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary",
    search = { name: nameToRemove };
  Person.remove(search, (err, data) => {
    if (err) console.error(err);
    console.log(data)
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito",
    search = { favoriteFoods: foodToSearch };
  Person.find(search)
    .sort('name')
    .limit(2)
    .select('name favoriteFoods')
    .exec((err, data) => {
      if (err) console.error(err);
      console.log({ data })
      done(null, data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

/*----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------*/

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
