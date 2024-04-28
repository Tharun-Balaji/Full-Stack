import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export default function useLogout() {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  async function logout() {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-app");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, logout };
}
