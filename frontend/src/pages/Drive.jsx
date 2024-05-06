import React, { useState } from "react";
import BucketList from "../components/BucketList";
import RecentFile from "../components/RecentFile";

const Drive = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleBucketListDragOver = () => {
    setIsDragOver(true);
  };

  const handleBucketListDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <main className={isDragOver ? "dragover" : ""}>
      <BucketList
        onDragOver={handleBucketListDragOver}
        onDragLeave={handleBucketListDragLeave}
      />
      <RecentFile />
    </main>
  );
};

export default Drive;
