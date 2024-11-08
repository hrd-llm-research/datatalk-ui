import { Input } from "@/components/ui/input";

export default function TextInput({ label, value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-[#143A47] text-[16px] mb-2">{label}</label>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-[48px] border border-[#D5D4DC] rounded-[14px] px-[20px] placeholder:text-[14px] placeholder-[#98A2B3] focus:border-[#007AFF] hover:border-[#007AFF] transition duration-200 ease-in-out"
      />
      {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}
    </div>
  );
}



