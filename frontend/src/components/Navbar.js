'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    Tetane Learn
                </Link>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    <Link href="/courses" className={styles.navLink}>Courses</Link>
                    {user ? (
                        <>
                            {user.role === 'student' && <Link href="/dashboard/student" className={styles.navLink}>My Learning</Link>}
                            {user.role === 'instructor' && <Link href="/dashboard/instructor" className={styles.navLink}>Instructor Dashboard</Link>}
                            <div className={styles.userSection}>
                                <span className={styles.userName}>{user.name}</span>
                                <button onClick={logout} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Logout</button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.authButtons}>
                            <Link href="/auth/login" className={styles.navLink}>Log in</Link>
                            <Link href="/auth/register" className="btn btn-primary" style={{ padding: '8px 16px' }}>Sign up</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className={styles.mobileMenu}>
                        <Link href="/courses" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Courses</Link>
                        {user ? (
                            <>
                                {user.role === 'student' && <Link href="/dashboard/student" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>My Learning</Link>}
                                {user.role === 'instructor' && <Link href="/dashboard/instructor" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Instructor Dashboard</Link>}
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className={styles.mobileLink} style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Log in</Link>
                                <Link href="/auth/register" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Sign up</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
