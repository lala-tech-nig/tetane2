'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

export default function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/courses/${id}`);
            if (!res.ok) throw new Error('Course not found');
            const data = await res.json();
            setCourse(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching course:', err);
            setLoading(false);
        }
    };

    if (loading) return <div className="container"><p>Loading...</p></div>;
    if (!course) return <div className="container"><p>Course not found.</p></div>;

    return (
        <div className={styles.courseHeader}>
            <div className="container">
                <div className={styles.headerContent}>
                    <div>
                        <span className={styles.category}>{course.category}</span>
                        <h1 className={styles.title}>{course.title}</h1>
                        <p className={styles.description}>{course.description}</p>
                        <div className={styles.meta}>
                            <span>Instructor: {course.instructorId?.name}</span>
                            <span>•</span>
                            <span>Level: {course.level || 'Beginner'}</span>
                        </div>
                    </div>

                    <div className={styles.sidebar}>
                        <div className={styles.sidebarCard}>
                            <div className={styles.price}>${course.price}</div>
                            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '10px' }}>Enroll Now</button>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>30-Day Money-Back Guarantee</p>
                            <ul className={styles.features}>
                                <li>Full lifetime access</li>
                                <li>Access on mobile and TV</li>
                                <li>Certificate of completion</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
