import ConfirmModal from "@/components/common/ConfirmModal";
import Header from "@/components/common/Header";
import BidBottomSheet from "@/components/item/detail/bid/BidBottomSheet";
import BidHistoryList from "@/components/item/detail/bidHistory/BidHistoryList";
import Footer from "@/components/item/detail/footer/Footer";
import ItemCard from "@/components/item/detail/itemCard/ItemCard";
import ItemImage from "@/components/item/detail/itemImage/ItemImage";
import QnaInputBar from "@/components/item/detail/qna/QnaInputBar";
import QnaList from "@/components/item/detail/qna/QnaList";
import { useAuctionQnaApi } from "@/hooks/item/detail/useAuctionQnaApi";
import { useItemBid } from "@/hooks/useItemBid";
import { useItemModal } from "@/hooks/useItemModal";
import { useItemQna } from "@/hooks/useItemQna";
import { useItemState } from "@/hooks/useItemState";
import { mockBids, mockImages, mockItems } from "@/mock/itemDetail";
import { useParams } from "react-router-dom";

const ItemDetailPage = () => {
  const { id } = useParams();
  const auctionId = Number(id);

  const item = mockItems;

  const { getQnaMutation } = useAuctionQnaApi();
  const { data: qnaData } = getQnaMutation(auctionId);

  // 제품 상태
  const { isLive, isEnded, viewState, depositAmount, hasBid, isSeller } =
    useItemState({ item });

  // 모달
  const {
    isChatModalOpen,
    setChatModalOpen,
    isRejectModalOpen,
    setRejectModalOpen,
    handleConfirmChat,
    handleConfirmReject,
  } = useItemModal(item.roomId);

  // Q&A
  const {
    isAsking,
    replyingToId,
    handleAskQuestion,
    handleStartReply,
    handleCancelReply,
    handleQuestionSubmit,
    handleReplySubmit,
    cancelAsking,
  } = useItemQna(auctionId);

  // 입찰
  const {
    isBidSheetOpen,
    setBidSheetOpen,
    currentHighestPrice,
    handleBidSubmit,
    closeBidSheet,
  } = useItemBid(item.currentPrice);

  // 입찰하기 버튼 클릭시
  const handleBidClick = () => {
    setBidSheetOpen(true);
  };

  return (
    <div className="bg-grey02">
      <Header />
      <ItemImage images={mockImages} />
      <ItemCard
        item={item}
        isLive={isLive}
        isEnded={isEnded}
        viewState={viewState}
        depositAmount={depositAmount}
        hasBid={hasBid}
      />
      <BidHistoryList
        state={item.state}
        bids={mockBids.bids}
        totalBidCount={mockBids.totalBidCount}
      />
      <QnaList
        qnaList={qnaData || []}
        isSeller={isSeller}
        replyingToId={replyingToId}
        onAskQuestion={handleAskQuestion}
        onStartReply={handleStartReply}
        onCancelReply={handleCancelReply}
        onReplySubmit={handleReplySubmit}
      />

      {/* 질문하기를 누르면 Footer X */}
      {isAsking ? (
        <QnaInputBar onSubmit={handleQuestionSubmit} onClose={cancelAsking} />
      ) : (
        <Footer
          viewState={viewState}
          isSeller={isSeller}
          onBidClick={handleBidClick}
          onChatClick={() => setChatModalOpen(true)}
          onRejectBuyClick={() => setRejectModalOpen(true)}
        />
      )}

      {/* 채팅 모달 */}
      <ConfirmModal
        isOpen={isChatModalOpen}
        onClose={() => setChatModalOpen(false)}
        onConfirm={handleConfirmChat}
        title="채팅"
        confirmText="네, 채팅할래요."
      >
        <p>채팅하시겠습니까?</p>
      </ConfirmModal>

      {/* 구매 거부 모달 */}
      <ConfirmModal
        isOpen={isRejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={handleConfirmReject}
        title="구매 거부하시겠습니까?"
        confirmText="구매 거부 할래요"
      >
        <p>
          낙찰된 경매의 구매를 거부할 시,
          <br />
          최종 낙찰가의 10%가 보증금으로 차감됩니다.
        </p>
      </ConfirmModal>

      {/* 입찰하기 바텀 시트 */}
      <BidBottomSheet
        isOpen={isBidSheetOpen}
        onClose={closeBidSheet}
        currentHighestPrice={currentHighestPrice}
        onBidSubmit={handleBidSubmit}
      />
    </div>
  );
};

export default ItemDetailPage;
