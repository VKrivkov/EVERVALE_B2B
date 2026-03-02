import React from "react";
import FooterColumn from "../common/FooterColumn";
import Logo from "../ui/Logo";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/20 bg-transparent">
      <div className="flex w-full flex-col items-center justify-between gap-12 px-4 py-14 sm:px-6 md:px-8 lg:px-[130px]">
        <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex w-full flex-col gap-5 text-center items-center md:items-start md:text-left lg:max-w-sm">
            <Logo />
            <div className="space-y-1 text-white/80">
              <p>+352 662 345 456</p>
              <p>contact@evervale.com</p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-8 text-center sm:flex-row sm:justify-center sm:gap-10 md:w-auto md:items-start md:justify-start md:gap-12">
            <FooterColumn
              title="B2C"
              link1={"Support"}
              href1={""}
              link2={"Community"}
              href2={""}
              link3={"Help"}
              href3={""}
              link4={"My Info"}
              href4={""}
              className="text-center sm:text-center md:text-left lg:text-left"
            />
            <FooterColumn
              title="B2B"
              link1={"About Us"}
              href1={""}
              link2={"Welcome"}
              href2={""}
              link3={"Our Suplier"}
              href3={""}
              link4={"Contact Us"}
              href4={""}
              className="text-center sm:text-center md:text-left lg:text-left"
            />
            <FooterColumn
              title="Legal"
              link1={"Partners"}
              href1={""}
              link2={"About Us"}
              href2={""}
              link3={"Customers"}
              href3={""}
              link4={"Contact Us"}
              href4={""}
              className="text-center sm:text-center md:text-left lg:text-left"
            />
          </div>
        </div>
        <p className="text-ag-14 text-white/60 text-center">
          ©2025 EVERVALE. All right reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
