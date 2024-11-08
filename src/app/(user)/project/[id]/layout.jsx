import Navbar from "@/components/workspace/Navbar";
import SecondNavbar from "@/components/workspace/SecondNavbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col bg-[#F7F9FB] h-screen ">    
        <div className="mx-[70px]">
          <SecondNavbar />
        </div>
      <div className="flex-grow">
        <div className="mx-[70px] sm:mx-[40px]">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
