import DeliverySelector from "./DeliverySelector";

interface Props {
  delivery: string;
  onChangeDelivery: (value: string) => void;
  options: string[];
}

const AuctionDeliverySection = ({
  delivery,
  onChangeDelivery,
  options,
}: Props) => {
  return (
    <div className="mb-4">
      <label className="block text-med16 text-bluegrey10 mb-2">배송방법</label>

      <DeliverySelector
        value={delivery}
        onChange={onChangeDelivery}
        options={options}
      />
    </div>
  );
};

export default AuctionDeliverySection;
