// pages/login.jsx
import ThreeDComponent from 'ThreeDComponent';
import 'Auth.module.css';

export default function Login() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.formContainer}>
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className={styles.threeDContainer}>
        <ThreeDComponent sceneUrl="https://prod.spline.design/your-spline-scene/scene.splinecode" />
      </div>
    </div>
  );
}
