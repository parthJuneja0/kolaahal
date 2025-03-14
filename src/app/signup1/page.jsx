// pages/index.jsx
import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Black & Red 3D Auth</h1>
      <nav>
        <Link href="./login">Login</Link> | <Link href="/signup">Signup</Link>
      </nav>
    </div>
  );
}
