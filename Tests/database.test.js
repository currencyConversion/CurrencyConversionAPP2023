// Author: Daniel Jameson
// This file will test the database dml statements to make sure they work properly.
const assert = require('assert');
const {CustomerModel} = require("../app_server/models/locations");

// There may be connection problems with this. Functionality is limited.
describe("Create Records", () => {
    it("Create a User", () => {
        const daniel = new CustomerModel({
            username: "Daniel",
            phone: "0868901314",
            password: "password1",
            email: "daniel@email.com",
            accountcreation: Date,
            status: true
        })
        daniel
            .save()
            .then(() =>{
                assert(!daniel.isNew);
            })
            .catch(() => {
                console.log("Error!")
            });
    });
});

/// Read tests.

describe("Read tests", () => {
    let daniel;
    // Before Each block executes before main operation
    // Here, the callback function accepts Done (Mocha) to tell the function it is finished.
    beforeEach((done) => {
        daniel = new CustomerModel({
            username: "Daniel",
            phone: "0868901314",
            password: "password1",
            email: "daniel@email.com",
            accountcreation: Date,
            status: true
        })
        daniel.save()
            .then(() => {
                done();
            });
    });

    it("Read a user: Daniel", (done) => {
        CustomerModel.find({
            username: "Daniel"
        })
            // ObjectID is a BSON Object, therefore, ID needs to be converted.
            // Just convert both toString()
            .then((customers) =>{
                assert(daniel._id.toString() === customers[0]._id.toString());
                done();
            });
    });
});

describe("Delete Tests", () => {
    let deleteman;

    beforeEach((done) => {
        deleteman = new CustomerModel({
            username: "Daniel",
            phone: "0868901314",
            password: "password1",
            email: "daniel@email.com",
            accountcreation: Date,
            status: true
        });
        deleteman.save().then(() => done());
    });

    it("A Delete test for Customer", (done) => {
        CustomerModel.findByIdAndDelete(deleteman._id)
            .then(() => CustomerModel.findOne({username: "Daniel"}))
            .then((customer) => {
                assert(customer === null);
                done();
            });
    });
});