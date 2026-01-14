import Link from 'next/link';
import styles from './CourseCard.module.css';

const CourseCard = ({ course }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imagePlaceholder}>
                <span>Course Image</span>
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.category}>{course.category || 'General'}</span>
                    <span className={styles.rating}>⭐ 4.8</span>
                </div>
                <h3 className={styles.title}>
                    <Link href={`/course/${course._id}`}>{course.title}</Link>
                </h3>
                <p className={styles.instructor}>By {course.instructorId?.name || 'Instructor'}</p>
                <div className={styles.footer}>
                    <span className={styles.price}>${course.price}</span>
                    <Link href={`/course/${course._id}`} className={styles.viewBtn}>View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
