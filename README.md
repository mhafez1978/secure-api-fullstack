# secure-api-fullstack - mono

The purpose of this repo is to start building a secure full stack driving school management system.

My goal is to provide a useful management and turn key SaaS online system to help Driving Schools manage their daily business operations.

We will secure user login , and perform user authorization to secure routes using sessions, passport and jwt

Data input sanitation and validation using Joi.

> The App users will belong to one of the following user groups:

- 'Admin'
- 'School Manager'
- 'Teacher'
- 'Student'
- 'parent'
- 'Guest'

> What will secure api fullstack Admin user role do?

- Admin will be able to add school
- Admin will be able to delete school
- Admin will be able to search for school by id
- Admin will be able to list all schools
- Admin will be able to search for school by name/slug
  -Admin will be able to assign a manager user to a school

> What will secure api fullstack School Manager user role do?

- Add Teacher
- Add Student
- Add Class
- Add Subject/Course/Program
- Setup Zoom Integration
- Setup Google Calendar Integration

> What will secure api fullstack School Teacher user role do?

- create a class
- create zoom meeting and associate / link to an active class
- setup class schedule
- grade students

> What will secure api fullstack School Student user role do?

- Sign up for class
- pay school fees
- review grade
- join zoom session/meeting
- see assigned classes and school class and events calendar

> What will secure api fullstack School Parent user role do?

- pay student fees
- check student fees
- send school teacher or admin email/msg

> What will secure api fullstack School Guest user role do?

- see what classes school have to offer
- register to class
- contact us with questions
