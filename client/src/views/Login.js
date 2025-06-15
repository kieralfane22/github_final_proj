import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import schoolLogo from '../assets/logo.png'; // Added branding

const Login = observer(({ authStore }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-16 w-auto" src={schoolLogo} alt="School Logo" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Student Portal Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {authStore.error && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md">
              {authStore.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Password inputs */}
            <button
              type="submit"
              disabled={authStore.isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {authStore.isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Demo Login Button */}
          <div className="mt-6">
            <button
              onClick={() => {
                setEmail('student@demo.com');
                setPassword('temp123');
              }}
              className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500"
            >
              Use Demo Student Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});