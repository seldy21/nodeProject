import React from "react";
import { IoIosClose } from "react-icons/io";

function Detail(props) {
  const { showDetail, hideContent } = props;
  return (
    <div className={`${showDetail.show ? "" : "h-0"} postWrapper scroll`}>
      <div className="postInner">
        <div className="d-flex">
          <IoIosClose className="ms-auto fs-1 pointer" onClick={hideContent} />
        </div>
        <div className="postContentWrapper">
          <h3>{showDetail.title}</h3>
          <div className="text-end">
            <span className="me-2">{showDetail.created_at}</span>

          </div>
          <div className="content_wrapper" dangerouslySetInnerHTML={{ __html: showDetail.content }}></div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
