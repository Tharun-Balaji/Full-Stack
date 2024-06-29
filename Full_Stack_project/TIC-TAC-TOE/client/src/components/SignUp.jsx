import { useState } from "react";


export default function SignUp() {
  const [user, setUser] = useState(null);
  const signUp = () => {};
  return (
		<div className="signUp">
			<label htmlFor="">Sign Up</label>
			<input
        type="text"
        value={user?.firstName}
				placeholder="First Name"
				onChange={(e) =>
					setUser({ ...user, firstName: e.target.value })
				}
			/>
			<input
        type="text"
        value={user?.lastName}
				placeholder="Last Name"
				onChange={(e) => setUser({ ...user, lastName: e.target.value })}
			/>
			<input
        type="text"
        value={user?.username}
				placeholder="User Name"
				onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="text"
        placeholder="password"
        value={user?.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}  
      />
      <button onClick={signUp}>Sign Up</button>
		</div>
  );
}
