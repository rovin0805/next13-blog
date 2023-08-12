import React from "react";
import PaddingContainer from "../layout/padding-container";
import siteConfig from "@/config/site";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-10 border-t py-8">
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">{siteConfig.siteName}</h2>
          <p className="mt-2 max-w-md text-lg  text-neutral-700">
            {siteConfig.description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-4">
          <div>
            <div className="text-lg font-medium">#explorerTheWorld</div>
            <div>Social Links</div>
          </div>
          <div>
            <div className="text-sm text-neutral-400">Currently At</div>
            <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-md">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              {siteConfig.currentlyAt}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t py-3">
          <div className="text-sm text-neutral-400">
            All rights are preserved | Copyright {new Date().getFullYear()}
          </div>
          <div className="text-sm">
            Made with love by{" "}
            <Link
              href={"https://github.com/rovin0805"}
              className="underline underline-offset-4"
            >
              @rovin0805
            </Link>
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Footer;
