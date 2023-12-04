import React from "react";
import { IoIosClose } from "react-icons/io";

function Detail(props) {
  const { showDetail, hideContent } = props;
  console.log();
  return (
    <div className={`${showDetail.show ? "" : "h-0"} postWrapper`}>
      <div className="postInner">
        <div className="d-flex">
          <IoIosClose className="ms-auto fs-1 pointer" onClick={hideContent} />
        </div>
        <div className="postContentWrapper">
          <h3>{showDetail.title}</h3>
          <div className="text-end">
            {showDetail.created_at}
          </div>
          <div dangerouslySetInnerHTML={{ __html: showDetail.content }}></div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
