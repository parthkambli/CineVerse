import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <>
      <div className="card text-bg-dark rounded-4">
        <Skeleton
          className="img-fluid card-img rounded-4 border border-4 border-white"
          style={{ height: 400 }}
        />
      </div>
      <h4 className="text-center px-4 m-0 mt-2">
        <Skeleton />
      </h4>
    </>
  );
};

export default SkeletonCard;
