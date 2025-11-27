import LoadingSpinner from "@/components/common/LoadingSpinner";
import ItemDetailContent from "@/components/item/detail/ItemDetailContent";
import { useBidApi } from "@/hooks/item/bid/useBidApi";
import { useAuctionDeailApi } from "@/hooks/item/detail/useAuctionDetailApi";
import { useAuctionQnaApi } from "@/hooks/item/detail/useAuctionQnaApi";
import { useParams } from "react-router-dom";

const ItemDetailPage = () => {
  const { id } = useParams();
  const auctionId = Number(id);

  const { getAuctionDetailQuery } = useAuctionDeailApi();
  const {
    data: auctionData,
    isLoading: isItemLoading,
    isError: isItemError,
  } = getAuctionDetailQuery(auctionId);

  const { getQnaMutation } = useAuctionQnaApi();
  const { data: qnaData } = getQnaMutation(auctionId);

  const { getBidHistoryQuery } = useBidApi();
  const { data: bidData } = getBidHistoryQuery(
    auctionData?.auctionId as number
  );

  if (isItemLoading) {
    return <LoadingSpinner />;
  }
  if (isItemError || !auctionData) {
    return (
      <div className="flex items-center justify-center text-grey10 text-semibold16">
        물품 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <ItemDetailContent
      auctionData={auctionData}
      qnaData={qnaData || []}
      bidData={bidData || { count: 0, bids: [] }}
    />
  );
};

export default ItemDetailPage;
