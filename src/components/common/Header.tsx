import { ChevronLeft } from "@/assets/svgs/common";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-full h-12 flex items-center justify-center bg-white border-b border-bluegrey02">
      <button
        onClick={handleBack}
        className="absolute left-2 cursor-pointer w-6 h-6"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <h1 className="text-med16 text-bluegrey10">{title}</h1>
    </div>
  );
};

export default Header;
