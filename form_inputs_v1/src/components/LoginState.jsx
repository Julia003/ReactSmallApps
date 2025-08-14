import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

export default function Login() {
  const {
    value: emailValue,
    hasError: emailIsInvalid,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
  } = useInput("", (value) => isNotEmpty(value) && isEmail(value));

  const {
    value: passwordValue,
    hasError: passwordIsInvalid,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useInput("", (value) => hasMinLength(value, 5));

  function handleSubmit(event) {
    event.preventDefault();

    if (emailIsInvalid || passwordIsInvalid) return;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={emailValue}
          error={emailIsInvalid && "Please, enter a valid email"}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={passwordValue}
          error={passwordIsInvalid && "Please, enter a valid password"}
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
