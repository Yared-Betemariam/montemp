import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return;
  return (
    <div className="flex items-center space-x-3 bg-destructive/20 text-destructive/80 text-sm rounded-md shadow-sm py-2 px-4">
      <FaExclamationTriangle />
      <span>{message}</span>
    </div>
  );
};
export default FormError;
