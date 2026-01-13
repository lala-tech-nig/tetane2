import Link from 'next/link';
import styles from './page.module.css';
import CourseCard from '@/components/CourseCard';

export default function Home() {
  const dummyCourses = [
    { id: 1, title: 'UI/UX Design Essentials', instructor: 'Jane Doe', rating: 4.8, reviews: 1245, price: 49.99, category: 'Design' },
    { id: 2, title: 'Full-Stack Web Development', instructor: 'John Smith', rating: 4.9, reviews: 850, price: 89.99, category: 'Development' },
    { id: 3, title: 'Digital Marketing Mastery', instructor: 'Sarah Wilson', rating: 4.7, reviews: 2300, price: 39.99, category: 'Marketing' },
    { id: 4, title: 'Data Science Fundamentals', instructor: 'Alex Brown', rating: 4.6, reviews: 500, price: 59.99, category: 'Data Science' },
  ];

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Learn. Create. Succeed with Tetane Learn</h1>
          <p className={styles.heroSubtitle}>Master high-demand skills with professional online courses designed for your career success in the digital age.</p>
          <div className={styles.heroButtons}>
            <Link href="/courses" className="btn btn-primary">Explore Courses</Link>
            <Link href="/about" className="btn btn-outline" style={{ marginLeft: '10px', color: 'white', borderColor: 'white' }}>Learn More</Link>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Popular Courses</h2>
          <Link href="/courses" className={styles.viewAll}>View All</Link>
        </div>
        <div className={styles.courseGrid}>
          {dummyCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>How It Works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>1</div>
              <h3>Choose Your Course</h3>
              <p>Browse our wide selection of industry-leading courses.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>2</div>
              <h3>Learn at Your Own Pace</h3>
              <p>Access high-quality video lessons anytime, anywhere.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>3</div>
              <h3>Get Certified</h3>
              <p>Complete assessments to earn your certificate test.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
