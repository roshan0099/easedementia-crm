
import "./style/login_style.css"
import logo from "./img/logo-nobg.png"
import { Link } from "react-router-dom"

export default function LoginPage() {


    return (
        <>
            <div className="container text-center center-container">
                {/* Image at the top */}
                <img src={logo} alt="Image" className="img-fluid mb-4" style={{ maxHeight: '200px' }} />
                <div className="btn-display">

                    <button type="button" className="login-btn">
                        Docs
                    </button>
                    <button type="button" className="login-btn">
                        Login
                    </button>
                    <button type="button" className="login-btn">
                        <Link to="invoice">Intervention Specialist</Link>
                    </button>

                </div>

            </div>

        </>
    )

}