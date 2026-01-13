'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    Tetane<span className={styles.logoHighlight}>Learn</span>
                </Link>

                <div className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </div>

                <ul className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
                    <li className={styles.navItem}><Link href="/courses" onClick={() => setIsOpen(false)}>Courses</Link></li>
                    <li className={styles.navItem}><Link href="/dashboard/student" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
                    <li className={styles.navItem}><Link href="/auth/login" className="btn btn-outline" onClick={() => setIsOpen(false)}>Login</Link></li>
                    <li className={styles.navItem}><Link href="/auth/register" className="btn btn-primary" onClick={() => setIsOpen(false)}>Get Started</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
