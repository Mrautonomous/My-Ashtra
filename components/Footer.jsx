import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <>
      {" "}
      <footer className="flex justify-between items-center h-[98px] border border-t-[#C9CED6]">
        <div>
          <p className="ml-[106px]">Policy and Privacy | Terms & Conditions</p>
        </div>
        <Image
          src="/footer-button.svg"
          width={56}
          height={56}
          alt="footer button"
          className="mr-[106px]"
        />
      </footer>
    </>
  );
}

export default Footer;
