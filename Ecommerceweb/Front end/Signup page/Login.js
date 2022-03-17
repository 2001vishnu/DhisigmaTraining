import "bootstrap/dist/css/bootstrap.min.css";
import { Row,Col } from "react-bootstrap";


const Login=()=>{
    return(
        <div>
            <body>
                
                <form>
                <Col className="mx-0">
                <h2>Login Page</h2><br></br>    
                <div as={Row} class="form-group col-md-6">
                    <label>Username</label>
                    <input type="text" class="form-control" id="inputEmail4" placeholder="Enter username"></input>
                </div>
                <div as={Row} class="form-group col-md-6">
                    <label >Password</label>
                    <input type="password" class="form-control" id="inputEmail4" placeholder="Enter Password"></input>
                </div><br></br>
                <div as={Row} class="form-group col-md-6">
                <button type="button" class="button1">Login</button>
                </div><br></br>
                <div as={Row} class="form-group col-md-6">
                <button type="button" class="button1"><a href="/">No Account? Sign up here</a></button>
                </div>
                </Col><br></br>
                </form>

            </body>
        </div>
    )
}

export default Login;