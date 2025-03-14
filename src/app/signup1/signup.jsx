// pages/signup.jsx
import ThreeDComponent from 'ThreeDComponent';
import 'Auth.module.css';

export default function Signup() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.formContainer}>
        <h2>Signup</h2>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Signup</button>
        </form>
      </div>
      <div className={styles.threeDContainer}>
        <ThreeDComponent sceneUrl="https://prod.spline.design/your-spline-scene/scene.splinecode" />
      </div>
    </div>
  );
}
