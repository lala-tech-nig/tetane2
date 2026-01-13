import Link from 'next/link';
import styles from './CourseCard.module.css';

const CourseCard = ({ course }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imagePlaceholder}>
                {/* Image would go here */}
                <span>{course.category}</span>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{course.title}</h3>
                <p className={styles.instructor}>{course.instructor}</p>
                <div className={styles.rating}>
                    {'★'.repeat(Math.round(course.rating))} <span>({course.reviews} reviews)</span>
                </div>
                <div className={styles.footer}>
                    <span className={styles.price}>${course.price}</span>
                    <Link href={`/course/${course.id}`} className={styles.button}>View</Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
