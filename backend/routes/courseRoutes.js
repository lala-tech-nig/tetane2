const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse } = require('../controllers/courseController');
const { enrollCourse, getEnrolledCourses } = require('../controllers/enrollmentController');
const auth = require('../middleware/auth');

router.get('/', getCourses);
router.get('/my/enrolled', auth, getEnrolledCourses); // Must be before /:id to avoid conflict
router.get('/:id', getCourseById);
router.post('/', auth, createCourse);
router.post('/:id/enroll', auth, enrollCourse);

module.exports = router;
