import ItemsDetailSection from "@/components/item/detail/itemCard/ItemDetailSection";
import ItemHeader from "@/components/item/detail/itemCard/ItemHeader";
import PriceBox from "@/components/item/detail/itemCard/PriceBox";
import SellerInfo from "@/components/item/detail/itemCard/SellerInfo";
import { ViewState } from "@/types/item/detail/ItemCard.type";
import { AuctionDetailResponse } from "@/types/item/detail/itemDetailApi.type";

export interface ItemCardProps {
  item: AuctionDetailResponse;
  isLive: boolean;
  isEnded: boolean;
  viewState: ViewState;
  depositAmount: number;
  hasBid: boolean;
}

const ItemCard = ({
  item,
  isLive,
  isEnded,
  viewState,
  depositAmount,
  hasBid,
}: ItemCardProps) => {
  return (
    <div className="bg-white py-4 mb-2">
      <div className="mx-4">
        <ItemHeader
          isLive={isLive}
          endAt={item.endAt}
          goodsName={item.goodsName}
        />
        <PriceBox
          viewState={viewState}
          isEnded={isEnded}
          currentPrice={item.startPrice}
          bidCount={item.totalNumOfBidder}
          myPrice={item.myBidPrice}
          hasBid={hasBid}
          depositAmount={depositAmount}
        />
        <ItemsDetailSection item={item} />
        <SellerInfo seller={item.seller} />
      </div>
    </div>
  );
};

export default ItemCard;
