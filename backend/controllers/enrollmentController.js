const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Enroll a student in a course
// @route   POST /api/courses/:id/enroll
// @access  Private (Student)
exports.enrollCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const studentId = req.user.id;

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        // Check if already enrolled
        const user = await User.findById(studentId);
        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ msg: 'Already enrolled in this course' });
        }

        // Add course to user's enrolledCourses
        user.enrolledCourses.push(courseId);
        await user.save();

        // Add student to course's students list
        course.students.push(studentId);
        await course.save();

        res.json({ msg: 'Enrollment successful', courseId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get enrolled courses for current student
// @route   GET /api/courses/my/enrolled
// @access  Private (Student)
exports.getEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'enrolledCourses',
            populate: { path: 'instructorId', select: 'name' }
        });

        res.json(user.enrolledCourses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
