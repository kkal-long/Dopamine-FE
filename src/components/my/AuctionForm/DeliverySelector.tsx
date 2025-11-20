interface Props {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const DeliverySelector = ({ value, onChange, options }: Props) => {
  return (
    <div className="flex h-[46px] gap-3 mb-4">
      {options.map(d => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={`flex-1 py-2 rounded-[8px] border text-med14 transition cursor-pointer
            ${
              value === d
                ? "bg-[#FEE6EE] text-mainpink border-mainpink"
                : "border-bluegrey02 text-bluegrey09"
            }`}
        >
          {d}
        </button>
      ))}
    </div>
  );
};

export default DeliverySelector;
