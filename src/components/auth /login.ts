import loginHtml from "./login.html?raw";
import "./login.css";

const Login = (element: HTMLDivElement) => {
  element.innerHTML = loginHtml;
};

export default Login;
