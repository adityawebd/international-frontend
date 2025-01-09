import Link from "next/link";
import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Breadcrumbs = (props) => {
  return (
    <div>
      <div className="bg_gray breadcrumbs_wrapper py-3">
        <div className="container">
          <div className="flex justify-start items-center">
            {/* <h3 className="font-medium">{props.page_title}</h3> */}
            <div className="breadcrumbs flex justify-between items-center">
              <Link href="/" className="text-sm green_font">
                Home
              </Link>
              <div className={`breadcrumbs flex justify-between items-center text-sm ${props.page_title2 ? "green_font" : "text-gray-600"}`}>
                {" "}
                <span>
                  <MdKeyboardDoubleArrowRight />
                </span>{" "}
                {props.page_title2 ? (
                  <Link href="/">{props.page_title}</Link>
                ) : (
                  <>{props.page_title}</>
                )}
              </div>
            </div>
            {props.page_title2 && (
              <>
                <div className="breadcrumbs flex justify-between items-center text-sm text-gray-600/100 productTitle">
                  <span>
                    <MdKeyboardDoubleArrowRight />
                  </span>{" "}
                  {props.page_title2}{" "}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
