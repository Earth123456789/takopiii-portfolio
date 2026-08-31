"use client";

import React from "react";
import Footer from "@/components/Footer";

export const FooterSlide: React.FC = () => {
  return (
    <section className="footer-slide w-full h-full flex flex-col justify-between max-h-full overflow-y-auto">
      <Footer />
    </section>
  );
};
