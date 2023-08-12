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
}

const SocialLink = ({ platform, link }: ISocialLink) => {
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
      {getIcon()}
    </Link>
  );
};

export default SocialLink;
