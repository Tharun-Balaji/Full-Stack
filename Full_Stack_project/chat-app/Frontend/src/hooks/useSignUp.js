import { useState } from "react";
import toast from "react-hot-toast";

export default function useSignUp() {
  const [loading, setLoading] = useState(false);

  async function SignUp({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    console.log(success)
    if (!success) {
      return;
    }
    console.log("message: Api Call success")
    setLoading(true);
    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      console.log(response)
      const data = await response.json();

      if ( data.error ){
        throw new Error(data.error);
      }

      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

  }

  return {
    SignUp,
    loading,
  };
}

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the required fields");
    return false;
  }

  if (password != confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true
}
