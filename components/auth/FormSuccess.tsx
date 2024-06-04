import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return;
  return (
    <div className="flex items-center space-x-3 bg-emerald-500/20 text-emerald-700/80 text-sm rounded-md shadow-sm py-2 px-4">
      <FaCheckCircle />
      <span>{message}</span>
    </div>
  );
};
export default FormSuccess;
