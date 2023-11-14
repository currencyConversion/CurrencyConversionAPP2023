const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');  // Adjust the path based on your project structure

chai.use(chaiHttp);
const expect = chai.expect;

describe('View Tests', () => {
    it('should render the Currency Exchange view', (done) => {
        chai.request(app)
            .get('/')  // Assuming '/' is the route that renders the 'index' view
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.html;  // Assuming the response should be HTML

                // Add more assertions as needed
                // You might want to check specific elements or text in the rendered view

                done();
            });
    });
});

