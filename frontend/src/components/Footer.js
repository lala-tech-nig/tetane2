import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.col}>
                    <h3>TetaneLearn</h3>
                    <p>Empowering students worldwide with quality digital skills.</p>
                </div>
                <div className={styles.col}>
                    <h4>Links</h4>
                    <ul>
                        <li><Link href="/courses">Courses</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h4>Legal</h4>
                    <ul>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/terms">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} Tetane Learn. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
