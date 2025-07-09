const { faker } = require('@faker-js/faker');

async function generateDummyData(type) {
    if (type === 'cat') {
        const Cat = require('../models/Cat');
        const cat = new Cat({
            name: faker.word.adjective(),
            breed: faker.animal.cat(),
            age: faker.number.int({ min: 1, max: 20 })  // ← this is the new syntax
        });
        await cat.save();
        return cat.toObject();
    }

    if (type === 'employee') {
        const Employee = require('../models/Employee');
        const emp = new Employee({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            position: faker.person.jobTitle(),
            salary: faker.number.int({ min: 30000, max: 100000 })
        });
        await emp.save();
        return emp.toObject();
    }

    throw new Error("Invalid type");
}

module.exports = generateDummyData;
