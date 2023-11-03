import { IReview } from "@/types/global";
import { UserOutlined } from "@ant-design/icons";
import { Rate } from "antd";

const ReviewCard = ({ review }: { review: IReview }) => {
  return (
    <div>
      <p className="text-lg font-bold">
        <UserOutlined /> {review?.customer?.firstName}{" "}
        {review?.customer?.lastName}
      </p>
      <div className="ml-5 my-2">
        <Rate disabled defaultValue={review?.rating} />
        <p>{review?.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
