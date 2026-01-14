'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from '../login/page.module.css'; // Reusing styles

export default function RegisterPage() {
    const { register } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const res = await register(formData);

        if (!res.success) {
            setError(res.error);
            setIsLoading(false);
        }
        // Redirect is handled in context
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.header}>
                    <Link href="/" className={styles.logo}>Tetane Learn</Link>
                    <h1 className={styles.title}>Create an account</h1>
                    <p className={styles.subtitle}>Start your learning journey today.</p>
                </div>

                {error && <div className={styles.errorAlert}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.roleSelector}>
                        <div
                            className={`${styles.roleOption} ${formData.role === 'student' ? styles.active : ''}`}
                            onClick={() => handleRoleSelect('student')}
                        >
                            Student
                        </div>
                        <div
                            className={`${styles.roleOption} ${formData.role === 'instructor' ? styles.active : ''}`}
                            onClick={() => handleRoleSelect('instructor')}
                        >
                            Instructor
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>Already have an account? <Link href="/auth/login" className={styles.link}>Sign in</Link></p>
                </div>
            </div>
        </div>
    );
}
