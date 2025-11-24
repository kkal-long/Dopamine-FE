import { QnaItemProps } from "@/types/item/detail/Qna.type";
import { formatTimeAgo } from "@/utils/dateUtils";
import clsx from "clsx";
import { useState } from "react";

const QnaItem = ({
  qna,
  isSeller,
  isReplying,
  onStartReply,
  onCancelReply,
  onReplySubmit,
}: QnaItemProps) => {
  const hasAnswer = !!qna.answerContent;
  const [replyText, setReplyText] = useState("");

  const renderRelpyForm = () => (
    <div className="bg-grey02 mt-2 p-3 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-mainpink text-med14">판매자</span>
      </div>

      <textarea
        value={replyText}
        onChange={e => setReplyText(e.target.value)}
        placeholder="답변을 입력하세요..."
        className="w-full bg-transparent text-darkgrey03 text-reg14 placeholder-darkgrey01 outline-none resize-none"
        rows={3}
      />

      {/* 취소/등록 버튼 */}
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={onCancelReply}
          className="text-med13 text-darkgrey04 cursor-pointer"
        >
          취소
        </button>
        <button
          onClick={() => {
            onReplySubmit(qna.qnaId, replyText);
            setReplyText("");
          }}
          className="text-med13 text-mainpink cursor-pointer"
        >
          등록
        </button>
      </div>
    </div>
  );

  const renderAnswerBlock = () =>
    qna.answerContent && (
      <div className="bg-grey02 mt-2 p-3 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-mainpink text-med14">판매자</span>
          <span className="text-bluegrey08 text-reg12">
            {formatTimeAgo(qna.answerCreatedAt || "")}
          </span>
        </div>
        <p className="text-darkgrey03 text-reg14 whitespace-pre-wrap">
          {qna.answerContent}
        </p>
      </div>
    );

  return (
    <div className="flex gap-5">
      <div
        className={clsx(
          "w-1 shrink-0",
          hasAnswer ? "bg-mainpink" : "bg-bluegrey02"
        )}
      />

      <div className="w-full">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <img
                src={qna.questionUserProfileImageUrl}
                alt={qna.questionUserNickname}
                className="w-8 h-8 object-cover bg-white rounded-full"
              />
              <div>
                <div className="text-med14 text-darkgrey05">
                  {qna.questionUserNickname}
                </div>
                <div className="text-reg12 text-darkgrey01">
                  {formatTimeAgo(qna.questionCreatedAt)}
                </div>
              </div>
            </div>

            {isSeller && !hasAnswer && !isReplying && (
              <button
                onClick={() => onStartReply(qna.qnaId)}
                className="bg-lightpink text-mainpink text-reg12 rounded-md h-7 my-auto px-2 py-1 cursor-pointer"
              >
                답변 달기
              </button>
            )}
          </div>

          <p className="text-reg14 text-darkgrey03 whitespace-pre-wrap">
            {qna.questionContent}
          </p>
        </div>

        {hasAnswer && renderAnswerBlock()}
        {isReplying && renderRelpyForm()}
      </div>
    </div>
  );
};

export default QnaItem;
