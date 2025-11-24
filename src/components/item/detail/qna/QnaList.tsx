import QnaItem from "@/components/item/detail/qna/QnaItem";
import { QnaListProps } from "@/types/item/detail/Qna.type";

const QnaList = ({
  qnaList,
  isSeller,
  replyingToId,
  onAskQuestion,
  onStartReply,
  onCancelReply,
  onReplySubmit,
}: QnaListProps) => {
  return (
    <div className="bg-white py-4 mb-2">
      <div className="mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-med18 text-darkgrey05">Q&A</h3>
          {!isSeller && (
            <button
              onClick={onAskQuestion}
              className="text-med14 text-darkgrey01 cursor-pointer"
            >
              질문하기
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {qnaList && qnaList.length > 0 ? (
            qnaList.map(qna => (
              <QnaItem
                key={qna.qnaId}
                qna={qna}
                isSeller={isSeller}
                isReplying={qna.qnaId === replyingToId}
                onStartReply={onStartReply}
                onCancelReply={onCancelReply}
                onReplySubmit={(questionId, answerText) =>
                  onReplySubmit(questionId, answerText)
                }
              />
            ))
          ) : (
            <p className="text-center text-reg14 text-grey06 py-6">
              아직 등록된 질문이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QnaList;
