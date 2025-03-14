// pages/login.jsx
// import ThreeDComponent from './ThreeDComponent';
import styles from './Auth.module.css';

export default function Login() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.formContainer}>
        <h2>Login</h2>
      <div class="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-sm p-10">
        <div class="flex justify-end">
            <i class="fas fa-times text-gray-400 cursor-pointer"></i>
        </div>
        <div class="flex justify-center mb-4">
            <div class="bg-gray-800 p-4 rounded-full">
                <i class="fas fa-circle text-white text-2xl"></i>
            </div>
        </div>
        <h2 class="text-center text-2xl font-semibold mb-2">Welcome back</h2>
        <p class="text-center text-gray-400 mb-6">Enter your credentials to login to your account.</p>
        <form>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1" for="email">Email</label>
                <input class="w-full px-3 py-2 bg-gray-800 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600" type="email" id="email" placeholder="hi@yourcompany.com"/>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1" for="password">Password</label>
                <input class="w-full px-3 py-2 bg-gray-800 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600" type="password" id="password" placeholder="Enter your password"/>
            </div>
            <div class="flex items-center justify-between mb-6">
                {/* <div class="flex items-center">
                    <input type="checkbox" id="remember" class="form-checkbox h-4 w-4 text-gray-600"/>
                    <label for="remember" class="ml-2 text-sm text-gray-400">Remember me</label>
                </div> */}
                {/* <a href="#" class="text-sm text-gray-400 hover:underline">Forgot password?</a> */}
            </div>
            <button class="w-full bg-white text-gray-900 py-2 rounded font-semibold hover:bg-gray-200 transition duration-200">Sign in</button>
        </form>
        {/* <div class="flex items-center my-6">
            <hr class="flex-grow border-gray-700"/>
            <span class="mx-2 text-gray-400">Or</span>
            <hr class="flex-grow border-gray-700"/>
        </div>
        <button class="w-full bg-gray-800 text-white py-2 rounded font-semibold hover:bg-gray-700 transition duration-200">Login with Google</button> */}
    </div>


      </div>
      {/* <div className={styles.threeDContainer}>
        <ThreeDComponent sceneUrl="https://prod.spline.design/your-spline-scene/scene.splinecode" />
      </div> */}
    </div>
  );
}
