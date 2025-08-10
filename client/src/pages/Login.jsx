import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
export default function Login() {


    return (
        <div className="login-signup">
            <h2>Start Shopping</h2>
            <div className="login">
            <form>
                <MdOutlineAlternateEmail className="email-icon"/>
                <input type="email" id="email" placeholder=" " required />
                <label htmlFor="email">Your Email</label>
                <br/>
                <RiLockPasswordFill className="password-icon"/>
                <input type="password" id="password" placeholder=" " required />
                <label htmlFor="password">Your Password</label>
                <br/>
                <button type="submit">Login</button>
            </form>
            </div> 
        </div>
    );
}