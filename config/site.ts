interface ISiteConfig {
  siteName: string;
  description: string;
  currentlyAt: string;
  socialLinks: { [key: string]: string };
}

const siteConfig: ISiteConfig = {
  siteName: "Explorer",
  description:
    "A minimal and lovely travel blog which shares experiences and cities around the world!",
  currentlyAt: "Seoul",
  socialLinks: {
    github: "https://www.github.com/rovin0805",
    instagram: "https://www.instagram.com/eunjay17/",
  },
};

export default siteConfig;
