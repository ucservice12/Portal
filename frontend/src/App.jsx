import { Routes, Route } from "react-router-dom";
import AuthLayout from "@/components/authLayout/AuthLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}
