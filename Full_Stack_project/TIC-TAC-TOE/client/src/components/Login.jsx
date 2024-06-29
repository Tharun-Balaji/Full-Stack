import { useState } from 'react'

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {};
  return (
		<div>
			<div className="login">
				<label htmlFor="">Login</label>
				
				<input
          type="text"
          value={userName}
					placeholder="User Name"
					onChange={(e) =>
						setUserName(e.target.value)
					}
				/>
				<input
          type="text"
          value={password}
					placeholder="password"
					onChange={(e) =>
            setPassword(e.target.value)
					}
				/>
				<button onClick={login}>Login</button>
			</div>
		</div>
  );
}
