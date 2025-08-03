import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import useUser from './useUser.js';

export default function NavBar(){
  const { isLoading, user } = useUser();

  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/articles'>Articles</Link></li>
        {isLoading ? <li>Loading...</li> : (
          <>
            {user && (
              <li>
                <p>Is logged in as {user.email}</p>
              </li>
            )}
            <li>{ user 
              ? <button onClick={() => signOut(getAuth())}>Sign Out</button>
              : <button onClick={() => navigate('/login')}>Sign In</button>
            }</li>
          </>
        )}
      </ul>
    </nav>
  );
}
