const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../index");
const query = require("../db/customers");
const should = chai.should();

// using chai-http plugin with use()function of chai library
chai.use(chaihttp);

// defining a testing customer object
const testCustomer = {
  firstname: "new",
  lastname: "Updateman",
  email: "1976@mail.com",
  phone: "197600",
};

// sending POST request to api/customers endpoint with chai-http request() function
describe("/POST customers", () => {
  beforeEach((done) => {
    query.deleteAllCustomers();
    done();
  });

  it("Add new customer", (done) => {
    chai
      .request(app)
      .post("/api/customers")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(testCustomer))
      .end((err, res) => {
        // checking the test results with should assertions
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("firstname");
        done(); //  the callback is completed
      });
  });
});

describe("/GET customers", () => {
  it("Fetch all customers", (done) => {
    chai
      .request(app)
      .get("/api/customers")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1); // checking the expected number of customers in database
        done();
      });
  });
});
