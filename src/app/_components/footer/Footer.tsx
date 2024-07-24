import React from "react";
import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-bgPrimary border-lightestGrey flex items-center justify-between border-t px-8 py-6">
      <p className="text-lighterGrey font-semibold">Video first podcasts</p>
      <Logo />
    </footer>
  );
};

export default Footer;
