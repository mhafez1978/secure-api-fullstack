require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

const Schools = require('./models/Schools');

// define my app routers
const publicRouter = express.Router();
const adminRouter = express.Router();
const apisRouter = express.Router();

// define my app controllers
const getAllSchools = require('./controllers/school/getAllSchools');
const searchSchoolById = require('./controllers/school/searchSchoolById');
const searchSchoolBySchoolName = require('./controllers/school/searchSchoolBySchoolName');
const addSchool = require('./controllers/school/addSchool.js');

// define my app models
const sequelize = require('sequelize');
const dbConection = new sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: process.env.DBDIALECT,
  }
);

// define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ############### Public Routes
publicRouter.get('/', (req, res) => {
  res.status(200).send('welcome to API homepage ...');
});
publicRouter.get('/about', (req, res) => {
  res.status(200).send('welcome to API about page ...');
});
app.use('/', publicRouter);

// ############# /admin/schools/search/:id
adminRouter.get('/schools/search/:id', (req, res) => {
  return searchSchoolById(req, res);
});
adminRouter.get('/schools/search/by/:slug', (req, res) => {
  return searchSchoolBySchoolName(req, res);
});
adminRouter.get('/schools/list', (req, res) => {
  return getAllSchools(req, res);
});

adminRouter.post('/schools/add', (req, res) => {
  //   console.log("we're adding a school ...");
  //   res.status(200).send('School was added ok ...');
  return addSchool(req, res);
});

adminRouter.delete('/schools/:id/delete', (req, res) => {
  console.log("we're deleting school by its id ...");
  res.status(200).send('School was deleted by id ok ...');
});

adminRouter.patch('/schools/:id/update', (req, res) => {
  console.log("we're updating the school info ...");
  res.status(200).send('School info was updated ok ...');
});
app.use('/admin', adminRouter);

// ############# API Routes
apisRouter.get('/', (req, res) => {
  console.log("API's Route Homepage ...");
  res.status(200).send("API's online");
});
app.use('/api', apisRouter);

// Start express web server
app.listen(PORT, async () => {
  try {
    await dbConection
      .authenticate()
      .then((res) => {
        console.log('###### Connection has been established successfully...');
      })
      .then(async () => {
        await Schools.sync();
      })
      .then(async (data) => {
        console.log('######### Schools table was created successfully...');
      });

    console.log(`######### API running on http://localhost:${PORT}...`);
  } catch (error) {
    console.error(
      '####### Unable to connect to the database due to Error:',
      error
    );
  }
});
