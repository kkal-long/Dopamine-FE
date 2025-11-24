import { SellerData } from "@/types/item/detail/itemDetailApi.type";

interface SellerInfoProps {
  seller: SellerData;
}

const SellerInfo = ({ seller }: SellerInfoProps) => (
  <section className="border-t border-bluegrey02 pt-4">
    <h3 className="text-reg14 text-bluegrey08 mb-2"> 판매자</h3>
    <div className="flex items-center space-x-2">
      <img
        src={seller.profileImageUrl}
        alt={seller.nickname}
        className="w-9 h-9 rounded-full bg-grey06 object-cover"
      />
      <span className="text-med14">{seller.nickname}</span>
    </div>
  </section>
);

export default SellerInfo;
