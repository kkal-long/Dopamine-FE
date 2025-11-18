import { Check } from "@/assets/svgs/common";
import { ProfileImages } from "@/constants/profileImage";
import clsx from "clsx";
import { useState } from "react";

const AdditionalInfoPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [nickname, setNickname] = useState("");

  const handleSubmit = () => {
    console.log("프로필 이미지: ", selectedImage);
    console.log("닉네임: ", nickname);
  };

  const ProfileImageUrl = ProfileImages[selectedImage];

  return (
    <div className="flex flex-col my-8 mx-4">
      <h2 className="text-bold20 text-bluegrey10 mb-8">
        프로필을 설정해 가입을 완료하세요.
      </h2>
      <p className="text-med16 text-bluegrey10 mb-2">
        프로필 이미지를 선택하세요
      </p>

      <div className="flex justify-center mb-3">
        <div className="w-24 h-24 rounded-full border border-black flex items-center justify-center overflow-hidden">
          <img
            src={ProfileImageUrl}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-8 ">
        {ProfileImages.map((url, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={clsx(
              "relative w-full aspect-square rounded-full border-2 flex items-center justify-center cursor-pointer",
              selectedImage === index ? "border-mainpink" : "border-grey04"
            )}
          >
            <img
              src={url}
              alt={`프로필 이미지${index + 1}`}
              className="w-16 h-16 object-cover"
            />
            {selectedImage === index && (
              <div className="absolute -top-2 -right-4 z-10">
                <Check className="w-5 h-5" />
              </div>
            )}
          </button>
        ))}
      </div>

      <p className="text-med16 text-bluegrey10 mb-4">닉네임을 설정하세요.</p>

      <input
        type="text"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        placeholder="닉네임을 입력하세요"
        className="w-full px-4 py-3 text-bluegrey10 text-reg16 border border-grey09 rounded-xl mb-2 focus:outline-none focus:border-mainpink"
      />

      <p className="text-reg14 text-darkgrey01 pl-1 mb-auto">
        2-10자 이내로 입력해주세요.
      </p>

      <button
        onClick={handleSubmit}
        disabled={!nickname || nickname.length < 2 || nickname.length > 10}
        className="w-full py-4 bg-mainpink text-white text-med16 rounded-xl disabled:bg-grey05 disabled:cursor-not-allowed hover:bg-pink-600 transition-colors mt-6 cursor-pointer"
      >
        완료
      </button>
    </div>
  );
};

export default AdditionalInfoPage;
