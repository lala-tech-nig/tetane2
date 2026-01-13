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
        }
        // Mock data for now, or fetch from /api/students/me/courses
    }, [user, loading, router]);

    if (loading || !user) return <div className="container"><p>Loading...</p></div>;

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1>My Learning</h1>
                <p>Welcome back, {user.name}!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                {/* 
                  Since we don't have an enrollment API yet, we'll show a placeholder or empty state.
                  In a real app, we would map through enrolledCourses here.
                */}
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
            </div>
        </div>
    );
}
