import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <ClipLoader color="#fe0a58" />
    </div>
  );
};

export default LoadingSpinner;
