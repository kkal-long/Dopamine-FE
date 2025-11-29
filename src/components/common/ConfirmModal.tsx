import { useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
  cancelText?: string;
  children: React.ReactNode;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
  cancelText = "취소",
  children,
}: ConfirmModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) {
    return;
  }

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-80 p-6"
        onClick={handleModalContentClick}
      >
        <div className="text-center text-black mb-7">
          <h3 className="text-med18 mb-3">{title}</h3>
          <div className="text-reg14">{children}</div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full py-2 bg-bluegrey02 text-med16 text-black rounded-xl cursor-pointer hover:bg-lightpink"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="w-full py-2 bg-mainpink text-med16 text-white rounded-xl cursor-pointer "
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
