import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
export default function Signup() {
    return (
        <div className="signup">
            <form>
                <MdOutlineAlternateEmail className="email-icon"/>
                <input type="text" placeholder="Name" required />
                
                <br/><RiLockPasswordFill className="password-icon"/>
                <input type="email" placeholder="Email" required />
                
                <br/>
                <input type="password" placeholder="Password" required /><br/>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}
