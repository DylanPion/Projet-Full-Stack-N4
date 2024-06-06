import React, { useState } from "react";
import BucketList from "../components/BucketList";
import RecentFile from "../components/RecentFile";
import Toast from "../components/Toast";
const Drive = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleBucketListDragOver = () => {
    setIsDragOver(true);
  };

  const handleBucketListDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="content">
      <main className={isDragOver ? "dragover" : ""}>
        <BucketList
          onDragOver={handleBucketListDragOver}
          onDragLeave={handleBucketListDragLeave}
        />
        <RecentFile />
      </main>
    </div>
  );
};

export default Drive;
