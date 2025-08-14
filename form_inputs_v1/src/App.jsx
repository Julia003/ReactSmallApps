import Header from "./components/Header.jsx";
import Signup from "./components/Signup.jsx";
// import Login from "./components/LoginRef.jsx";
import Login from "./components/LoginState.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Login />
      </main>
    </>
  );
}

export default App;
