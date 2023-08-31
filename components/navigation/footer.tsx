import React from "react";
import PaddingContainer from "../layout/padding-container";
import siteConfig from "@/config/site";
import Link from "next/link";
import SocialLink, { PlatformType } from "../elements/social-link";
import { getDictionary } from "@/lib/getDictionary";

const Footer = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);
  return (
    <div className="mt-10 border-t py-8">
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">{siteConfig.siteName}</h2>
          <p className="mt-2 max-w-md text-lg  text-neutral-700">
            {dictionary.footer.description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-4">
          <div>
            <div className="text-lg font-medium">#explorerTheWorld</div>
            <div className="mt-2 flex items-center gap-3 text-neutral-600">
              {Object.keys(siteConfig.socialLinks).map((platform) => (
                <SocialLink
                  key={platform}
                  platform={platform as PlatformType}
                  link={siteConfig.socialLinks[platform]}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-400">
              {dictionary.footer.currentlyAtText}
            </div>
            <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-md">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              {siteConfig.currentlyAt}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t py-3">
          <div className="text-sm text-neutral-400">
            {dictionary.footer.rightsText} {new Date().getFullYear()}
          </div>
          <div className="text-sm">
            {dictionary.footer.creatorText}{" "}
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
