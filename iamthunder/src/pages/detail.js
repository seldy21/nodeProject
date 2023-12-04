import React from "react";
import { IoIosClose } from "react-icons/io";

function Detail(props) {
  const {showDetail, hideContent} = props;
  return(
    <div className={`${showDetail.show ? "" : "h-0"} postWrapper`}>
      <div className="postInner">
        <div className="d-flex">
          <IoIosClose
            className="ms-auto fs-1 pointer"
            onClick={hideContent}
          />
        </div>
      </div>
    </div>)
}

export default Detail;