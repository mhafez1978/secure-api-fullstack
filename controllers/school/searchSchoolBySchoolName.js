const { Sequelize, Op } = require('sequelize');
const Schools = require('../../models/Schools');

const searchSchoolBySchoolName = async (req, res) => {
  let slug = req.params['slug'];

  try {
    let result = await Schools.findAll({
      where: {
        schoolName: {
          [Sequelize.Op.like]: `%${slug}%`,
        },
      },
    }).then((result) => {
      if (result.length === 0) {
        res.send('No School Matched the name given ...');
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = searchSchoolBySchoolName;
