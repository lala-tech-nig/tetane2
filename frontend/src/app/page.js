"use client";

import Link from 'next/link';
import CourseCard from '@/components/CourseCard';
import styles from './page.module.css';

// Using server component for simplicity in data fetching if needed, 
// for now hardcoding dummy popular courses or fetching from client in a real scenario
// We'll keep it static for the landing page for speed.

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Master New Skills with <br /><span className={styles.heroHighlight}>Tetane Learn</span></h1>
            <p className={styles.heroSubtitle}>
              Join thousands of learners worldwide. Access high-quality courses in coding, design, business, and more.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/courses" className="btn btn-primary">Start Learning</Link>
              <Link href="/auth/register" className="btn btn-outline">Join for Free</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statItem}>
            <h3>10k+</h3>
            <p>Students</p>
          </div>
          <div className={styles.statItem}>
            <h3>500+</h3>
            <p>Courses</p>
          </div>
          <div className={styles.statItem}>
            <h3>100+</h3>
            <p>Instructors</p>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Courses</h2>
            <Link href="/courses" className={styles.sectionLink}>View all courses &rarr;</Link>
          </div>

          <div className={styles.courseGrid}>
            {/* Mock Courses - in real app, fetch these */}
            <MockCourseCard
              title="Complete Web Development Bootcamp"
              instructor="Sarah Doe"
              price="89.99"
              category="Development"
            />
            <MockCourseCard
              title="UI/UX Design Masterclass"
              instructor="John Smith"
              price="69.99"
              category="Design"
            />
            <MockCourseCard
              title="Digital Marketing Strategy"
              instructor="Emily White"
              price="49.99"
              category="Marketing"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`${styles.featuresSection} section`}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} ${styles.centerTitle}`}>Why Choose Tetane Learn?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚀</div>
              <h3>Learn at your pace</h3>
              <p>Enjoy lifetime access to courses on the website and app.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👨‍🏫</div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry experts passionate about teaching.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📜</div>
              <h3>Get Certified</h3>
              <p>Earn a certificate of completion for every course.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MockCourseCard({ title, instructor, price, category }) {
  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ height: '160px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
        Course Image
      </div>
      <div style={{ padding: '20px' }}>
        <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 'bold' }}>{category}</span>
        <h3 style={{ fontSize: '1.1rem', margin: '8px 0', lineHeight: '1.4' }}>{title}</h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{instructor}</p>
        <div style={{ marginTop: '16px', fontWeight: 'bold' }}>${price}</div>
      </div>
    </div>
  )
}
