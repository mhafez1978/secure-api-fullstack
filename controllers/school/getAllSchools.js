const Schools = require('../../models/Schools');

const getAllSchools = async (req, res) => {
  console.log('we will fetch school list from db ...');
  try {
    const schoolsList = await Schools.findAll();
    if (schoolsList !== null) {
      res.status(200).json(schoolsList);
    } else {
      res.send("There're no schools found! Have you added any ? ...");
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = getAllSchools;
