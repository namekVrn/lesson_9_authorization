import {logOut} from '../../redux/auth/auth-operation';
import { useDispatch } from 'react-redux';
import { FrownOutlined } from '@ant-design/icons';

const LogIn = ({user})=> {
    const dispatch = useDispatch()
 console.log(user)
    return (
        <>
            <article>
                <p className="header__login--icon">{user ?  <p>{user.name}</p> :<FrownOutlined />}</p>
                {user ? <button onClick={()=>{dispatch(logOut())}}>выход</button> : null}
                
            </article>
        </>
    )
}
export default LogIn