'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CourseCard from '@/components/CourseCard';

export default function StudentDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        if (!loading && (!user || user.role !== 'student')) {
            router.push('/auth/login');
        } else if (user) {
            fetchEnrolledCourses();
        }
    }, [user, loading, router]);

    const fetchEnrolledCourses = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('https://tetane2.onrender.com/api/courses/my/enrolled', {
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            setEnrolledCourses(data);
        } catch (err) {
            console.error('Error fetching enrolled courses:', err);
        }
    };

    if (loading || !user) return <div className="container"><p>Loading...</p></div>;

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1>My Learning</h1>
                <p>Welcome back, {user.name}!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                {enrolledCourses.length > 0 ? (
                    enrolledCourses.map(course => (
                        <div key={course._id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ marginBottom: '10px' }}>{course.title}</h3>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>Instructor: {course.instructorId?.name}</p>
                                <Link href={`/course/${course._id}`} className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>Continue Learning</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{
                        border: '2px dashed #ccc',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '200px',
                        textAlign: 'center',
                        padding: '20px'
                    }}>
                        <p style={{ marginBottom: '15px', color: '#666' }}>You haven't enrolled in any courses yet.</p>
                        <Link href="/courses" className="btn btn-primary">Browse Courses</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
