import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            await authService.logout()
            dispatch(logout())
            navigate('/login')
        } catch {
            // Intentionally retain the authenticated UI if server logout fails.
        }
    }

    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn
