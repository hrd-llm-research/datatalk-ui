import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const PasswordInput = ({ value, onChange, label, placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col mb-2 relative">
      <label className="text-[#143A47] text-[16px] mb-2">{label}</label>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-[48px] border border-[#D5D4DC] rounded-[14px] px-[20px] placeholder:text-[14px] placeholder-[#98A2B3] focus:border-[#007AFF] hover:border-[#007AFF] transition duration-200 ease-in-out"
      />
      
      {/* Eye Icon for Show/Hide Password */}
      <button
        type="button"
        className={`absolute right-4 -translate-y-1/2 ${error ? 'top-[54%]' : 'top-[69%]'}`}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <EyeOffIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;

