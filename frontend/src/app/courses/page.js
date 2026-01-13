'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CourseCard from '@/components/CourseCard';
import styles from './page.module.css';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/courses');
            const data = await res.json();
            setCourses(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching courses:', err);
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || course.category === filter;
        return matchesSearch && matchesFilter;
    });

    const categories = ['All', 'Development', 'Design', 'Marketing', 'Business', 'Data Science'];

    return (
        <div className="container">
            <div className={styles.header}>
                <h1 className={styles.title}>Explore Courses</h1>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.filterContainer}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <p style={{ textAlign: 'center', margin: '50px 0' }}>Loading courses...</p>
            ) : (
                <div className={styles.grid}>
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <CourseCard key={course._id} course={{
                                id: course._id,
                                title: course.title,
                                instructor: course.instructorId?.name || 'Unknown Instructor',
                                rating: course.rating,
                                reviews: course.reviews.length,
                                price: course.price,
                                category: course.category
                            }} />
                        ))
                    ) : (
                        <p>No courses found matching your criteria.</p>
                    )}
                </div>
            )}
        </div>
    );
}
