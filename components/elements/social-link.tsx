import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export type PlatformType =
  | "facebook"
  | "instagram"
  | "twitter"
  | "github"
  | "youtube"
  | "linkedin";

interface ISocialLink {
  platform: PlatformType;
  link: string;
  isSharedUrl?: boolean;
}

const SocialLink = ({ platform, link, isSharedUrl = false }: ISocialLink) => {
  const getIcon = () => {
    switch (platform) {
      case "facebook": {
        return <Facebook size="18" />;
      }
      case "github": {
        return <Github size="18" />;
      }
      case "instagram": {
        return <Instagram size="18" />;
      }
      case "linkedin": {
        return <Linkedin size="18" />;
      }
      case "twitter": {
        return <Twitter size="18" />;
      }
      case "youtube": {
        return <Youtube size="18" />;
      }
    }
  };

  return (
    <Link href={link} target="_blank">
      <div
        className={`${
          isSharedUrl
            ? `rounded-md bg-neutral-200 px-3 py-2 text-neutral-600 transition-colors 
            duration-100 ease-in-out hover:bg-neutral-600 hover:text-neutral-100`
            : ""
        }`}
      >
        {getIcon()}
      </div>
    </Link>
  );
};

export default SocialLink;
