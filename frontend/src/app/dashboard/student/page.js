'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/my/enrolled`, {
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            setEnrolledCourses(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching enrolled courses:', err);
        }
    };

    if (loading || !user) return <div className="container section"><p>Loading...</p></div>;

    return (
        <div className="container section">
            <div style={{ paddingBottom: '30px', borderBottom: '1px solid var(--border-light)', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>My Learning</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user.name}!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                {enrolledCourses.length > 0 ? (
                    enrolledCourses.map(course => (
                        <div key={course._id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <div style={{ padding: '24px' }}>
                                <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '600' }}>{course.category}</span>
                                <h3 style={{ margin: '8px 0', fontSize: '1.2rem' }}>{course.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>Instructor: {course.instructorId?.name}</p>
                                <Link href={`/course/${course._id}`} className="btn btn-outline btn-full">Continue Learning</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{
                        gridColumn: '1 / -1',
                        border: '2px dashed var(--border-light)',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '60px',
                        textAlign: 'center'
                    }}>
                        <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>You haven't enrolled in any courses yet.</p>
                        <Link href="/courses" className="btn btn-primary">Browse Courses</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
