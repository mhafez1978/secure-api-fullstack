const Joi = require('joi');
const Schools = require('../../models/Schools');

const schema = Joi.object().keys({
  // add .required() to make a field data required
  // add .validate('charlotte','Lowell',...etc)

  schoolName: Joi.string().required(),
  schoolDescription: Joi.string(),
  schoolMainPhoneNumber: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  schoolAddressLine1: Joi.string(),
  schoolAddressLine2: Joi.string(),
  schoolCity: Joi.string(),
  schoolState: Joi.string(),
  schoolZipCode: Joi.string(),
  schoolBillingEmail: Joi.string().email({ minDomainSegments: 2 }),
  schoolSupportEmail: Joi.string().email({ minDomainSegments: 2 }),
  schoolManagerFirstName: Joi.string(),
  schoolManagerLastName: Joi.string(),
  schoolManagerEmail: Joi.string().email({ minDomainSegments: 2 }),
  schoolManagerPhoneNumber: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  schoolEmergencyEmail: Joi.string().email({ minDomainSegments: 2 }),
  schoolEmergencyContactPhoneNumber: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  schoolWebsiteURL: Joi.string().uri(),
  schoolLegalBusinessName: Joi.string(),
  schoolBusinessTaxIDNumber: Joi.string().regex(/^\d{3}-\d{2}-\d{4}$/),
  schoolBankAccountNumber: Joi.string().regex(
    /^[A-Z]{2}\d{2}[A-Z\d]{4}\d{7}([A-Z\d]?){0,16}$/
  ),
  schoolBankAccountRoutingNumber: Joi.string().regex(
    /^[A-Z]{6}[A-Z2-9][A-NP-Z1-9]{3}$/
  ),
});

const addSchool = async (req, res) => {
  const {
    schoolName,
    schoolDescription,
    schoolMainPhoneNumber,
    schoolAddressLine1,
    schoolAddressLine2,
    schoolCity,
    schoolState,
    schoolZipCode,
    schoolBillingEmail,
    schoolSupportEmail,
    schoolManagerFirstName,
    schoolManagerLastName,
    schoolManagerEmail,
    schoolManagerPhoneNumber,
    schoolEmergencyEmail,
    schoolEmergencyContactPhoneNumber,
    schoolWebsiteURL,
    schoolLegalBusinessName,
    schoolBusinessTaxIDNumber,
    schoolBankAccountNumber,
    schoolBankAccountRoutingNumber,
  } = req.body;

  // Validate req.body against the schema using Joi
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  } else {
    const checkIfDuplicateSchoolExistsFirst = await Schools.findOne({
      where: { schoolMainPhoneNumber: schoolMainPhoneNumber },
    });
    // Check if a school with the same main phone number already exists in the databas
    if (checkIfDuplicateSchoolExistsFirst === null) {
      try {
        // If there is no duplicate school, create a new school
        const newSchool = await Schools.create({
          schoolName: schoolName,
          schoolDescription: schoolDescription,
          schoolMainPhoneNumber: schoolMainPhoneNumber,
          schoolAddressLine1: schoolAddressLine1,
          schoolAddressLine2: schoolAddressLine2,
          schoolCity: schoolCity,
          schoolState: schoolState,
          schoolZipCode: schoolZipCode,
          schoolBillingEmail: schoolBillingEmail,
          schoolSupportEmail: schoolSupportEmail,
          schoolManagerFirstName: schoolManagerFirstName,
          schoolManagerLastName: schoolManagerLastName,
          schoolManagerEmail: schoolManagerEmail,
          schoolManagerPhoneNumber: schoolManagerPhoneNumber,
          schoolEmergencyEmail: schoolEmergencyEmail,
          schoolEmergencyContactPhoneNumber: schoolEmergencyContactPhoneNumber,
          schoolWebsiteURL: schoolWebsiteURL,
          schoolLegalBusinessName: schoolLegalBusinessName,
          schoolBusinessTaxIDNumber: schoolBusinessTaxIDNumber,
          schoolBankAccountNumber: schoolBankAccountNumber,
          schoolBankAccountRoutingNumber: schoolBankAccountRoutingNumber,
        });

        // Send a 201 Created response
        res.status(201).json(newSchool);
      } catch (err) {
        // If there was an error creating the school, send a 500 Internal Server Error response
        res.status(500).send(err);
      }
    } else {
      // If a school with the same main phone number already exists, send a 400 Bad Request response
      res.status(400).send('A school with this phone number already exists');
    }
  }
};

module.exports = addSchool;
