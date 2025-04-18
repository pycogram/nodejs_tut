import { useContext, useState } from "react";
import Alert from "../../components/alert";
import { loginUser } from "../../controllers/userControllers";
import { UserContext } from "../../contexts/userContexts";
import { useNavigate, useLocation } from "react-router-dom";
import Success from "../../components/success";

const Login = () => {
    // use usercontext
    const {user, setUser} = useContext(UserContext);

    const location = useLocation();
    const regInfo = location.state ?? "";

    // Error state
    const [error, setError] = useState("");
    
    // Success state
    const [successStatus, setSuccessStatus] = useState(regInfo?.message);

    // Input state
    const [email, setEmail] = useState(regInfo?.email);
    const [password, setPassword] =  useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessStatus("");

        try{
            // login user
            const data = await loginUser(email, password);

            navigate('/dashboard');

            //update user state
            setUser({
                email,
                posts: []
            });

        } catch(err){
            setError(err.message);
        }
    }

    const goToRegisterF = () => {
        navigate('/register');
    }

    return ( 
        <section className="card">
            <h1 className="title">Login</h1>
            {error && < Alert getError={error}/>}
            {successStatus && < Success getSuccessStatus={successStatus}/>}
            <form onSubmit={handleLogin}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="input"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="input"/>
                <p onClick={goToRegisterF} className="mb-2 text-end">No account? <span>Pls <span className="text-blue-900 font-bold cursor-pointer">Register</span></span></p>
                <button className="btn">Login</button>
            </form>
        </section>
     );
}
 
export default Login;