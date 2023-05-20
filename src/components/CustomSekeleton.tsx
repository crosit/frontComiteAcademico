import { Skeleton } from "antd";

type Props = {
  rows: number
}

const CustomSkeleton = (props:Props) => {
  const {
    rows
  } = props
  
  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <Skeleton.Input
          key={`skeleton-${index}`}
          active={true}
          block={true}
          className="mt-3"
        />
      ))}
      <Skeleton.Button block={true} className="mt-4" />
    </>
  );
};

export default CustomSkeleton;
