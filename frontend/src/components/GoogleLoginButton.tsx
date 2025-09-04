export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    // redirect to backend Google OAuth
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded w-64 mt-4 hover:bg-gray-100"
    >
      <img src="/google.svg" alt="Google" className="w-5 h-5" />
      Continue with Google
    </button>
  );
}
