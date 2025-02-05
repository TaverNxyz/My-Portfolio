
import { useState, useEffect } from "react";

const ADMIN_KEY = "your-secret-key";

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminKey = localStorage.getItem('admin_key');
    console.log('Current admin key:', adminKey);
    const isAdminUser = adminKey === ADMIN_KEY;
    console.log('Is admin?', isAdminUser);
    setIsAdmin(isAdminUser);
  }, []);

  return isAdmin;
};
