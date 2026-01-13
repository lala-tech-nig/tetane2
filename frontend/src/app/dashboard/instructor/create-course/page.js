'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css'; // Will create

export default function CreateCourse() {
    const { user } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Development',
        level: 'Beginner',
        language: 'English'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('https://tetane2.onrender.com/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to create course');

            router.push('/dashboard/instructor');
        } catch (err) {
            console.error(err);
            alert('Error creating course');
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Create New Course</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Course Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required
                        className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required
                        rows="5" className={styles.textarea}></textarea>
                </div>

                <div className={styles.grid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Price ($)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required
                            className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}
                            className={styles.select}>
                            <option>Development</option>
                            <option>Design</option>
                            <option>Marketing</option>
                            <option>Business</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Course</button>
            </form>
        </div>
    );
}
