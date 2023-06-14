import { logoutUser } from '../../redux/apicalls';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Logout = () => {
    const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(dispatch);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  handleLogout();
}

export default Logout;
