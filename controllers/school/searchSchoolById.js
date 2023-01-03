const Schools = require('../../models/Schools');

const searchSchoolById = async (req, res) => {
  let id = req.params['id'];
  id = Number(id);
  if (isNaN(id) === true) {
    res.send(
      'This is not a valid school id, try search again with a valid school id ...'
    );
  } else {
    let result = await Schools.findOne({ where: { schoolId: id } }).then(
      (result) => {
        if (!result) {
          res.send('No School matched the school id provided ...');
        } else {
          res.json(result);
        }
      }
    );
  }
};

module.exports = searchSchoolById;
