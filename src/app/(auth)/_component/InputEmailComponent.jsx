// components/ui/EmailInput.jsx
import { Input } from "@/components/ui/input";

export default function EmailInput({ value, onChange, error }) {
  return (
    <div className="flex flex-col mb-2">
      <label className="text-[#143A47] text-[16px] mb-1">Email</label>
      <Input
        type="email"
        placeholder="Enter your email"
        value={value}
        onChange={onChange}
       className="w-full h-[48px] border border-[#D5D4DC] rounded-[14px] px-[20px] placeholder:text-[14px] placeholder-[#98A2B3] focus:border-[#007AFF] hover:border-[#007AFF] transition duration-200 ease-in-out"
      />
      <div
        className={`mt-1 overflow-hidden transition-all duration-300 ${error ? 'max-h-10' : 'max-h-0'}`}
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
