import { Camera, NewPlus } from "@/assets/svgs/my";

interface Props {
  images: (File | null)[];
  setImages: React.Dispatch<React.SetStateAction<(File | null)[]>>;
}

const AuctionImageUploader = ({ images, setImages }: Props) => {
  const handleChange = (index: number, file: File | null) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages[index] = file;

      if (
        file &&
        newImages[newImages.length - 1] !== null &&
        newImages.length < 10
      ) {
        newImages.push(null);
      }

      return newImages;
    });
  };

  return (
    <div className="flex gap-3 mb-5 overflow-x-auto no-scrollbar">
      {images.map((img, i) => (
        <label
          key={i}
          className={`min-w-[106px] min-h-[106px] rounded-[8px] flex flex-col items-center justify-center
          bg-grey01 shrink-0 cursor-pointer
          ${
            img
              ? "border-none"
              : i === 0
                ? "border-[2px] border-dashed border-bluegrey03"
                : "border border-bluegrey02"
          }`}
        >
          {img ? (
            <img
              src={URL.createObjectURL(img)}
              className="w-[106px] h-[106px] object-cover rounded-[8px]"
            />
          ) : i === 0 ? (
            <div className="flex flex-col items-center text-darkgrey03">
              <Camera className="mb-2" />
              <span className="text-bluegrey08 text-med12">사진 추가</span>
            </div>
          ) : (
            <NewPlus className="text-bluegrey03" />
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleChange(i, e.target.files?.[0] || null)}
          />
        </label>
      ))}
    </div>
  );
};

export default AuctionImageUploader;
