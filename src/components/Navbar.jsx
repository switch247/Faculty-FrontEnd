import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard">
          <span className="text-xl font-bold cursor-pointer">Faculty Portal</span>
        </Link>
        <div className="flex gap-4 items-center">
          {user && (
            <>
              <Link href="/dashboard/profile">Profile</Link>
              <Link href="/dashboard/news">News</Link>
              <Link href="/dashboard/communities">Communities</Link>
              <Link href="/dashboard/chat">Chat</Link>
              <button
                onClick={logout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}