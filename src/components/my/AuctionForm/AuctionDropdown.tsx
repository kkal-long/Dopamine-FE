import { DropDown, DropUp } from "@/assets/svgs/my";
import { useState } from "react";

interface Props {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const AuctionDropdown = ({ label, value, options, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-med16 text-bluegrey10 mb-2">{label}</label>

      <div className="relative">
        <div
          className="w-full p-3 border border-bluegrey03 rounded-[8px] bg-white flex justify-between items-center cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className="text-reg16 text-darkgrey05">
            {value || "선택하세요"}
          </span>
          {open ? <DropDown /> : <DropUp />}
        </div>

        {open && (
          <div className="absolute z-20 mt-2 w-full bg-white border border-bluegrey03 rounded-[8px] max-h-[220px] overflow-y-auto shadow-md">
            {options.map(op => (
              <div
                key={op}
                className="p-3 text-darkgrey02 hover:bg-grey01 cursor-pointer"
                onClick={() => {
                  onChange(op);
                  setOpen(false);
                }}
              >
                {op}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionDropdown;
