const mongoose = require('mongoose');
// Connection string after cluster0 needs to be changed. Connection information is in Database section in MongoDB Atlas, top left on left nav bar.
// Click on Cluster0, then shell from the following menu. The String is in there.
const dbURI = "mongodb+srv://currencyconversion2023:12345@currencyconverterprojec.hhtduxa.mongodb.net/?retryWrites=true&w=majority";
try {
   
mongoose.connect(
    dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {console.log(" Mongoose is connected")},
	err=> {console.log(err)}
	);
}
 catch (e) {
  console.log("could not connect");
}