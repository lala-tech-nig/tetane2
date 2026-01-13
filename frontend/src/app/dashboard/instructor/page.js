'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function InstructorDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (!loading && (!user || user.role !== 'instructor')) {
            router.push('/auth/login');
        } else if (user) {
            fetchInstructorCourses();
        }
    }, [user, loading, router]);

    const fetchInstructorCourses = async () => {
        // We need a backend endpoint for this: GET /api/instructors/courses or GET /api/courses?instructor=mylsim
        // For now, let's assume we filter on client or have an endpoint
        // TODO: Implement /api/instructors/me/courses
    };

    if (loading || !user) return <div className="container"><p>Loading...</p></div>;

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Instructor Dashboard</h1>
                <Link href="/dashboard/instructor/create-course" className="btn btn-primary">Create New Course</Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
                    <h3>Total Students</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
                </div>
                <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
                    <h3>Total Earnings</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$0.00</p>
                </div>
                <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
                    <h3>Active Courses</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{courses.length}</p>
                </div>
            </div>

            <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>My Courses</h2>
            {courses.length === 0 ? (
                <p>You haven't created any courses yet.</p>
            ) : (
                <ul>
                    {/* List courses here */}
                </ul>
            )}
        </div>
    );
}
