import React from "react";
import parse, { Element } from "html-react-parser";
import Image from "next/image";

function PostBody({ body }: { body: string }) {
  const options = {
    replace: (domNode: any) => {
      if (domNode instanceof Element && domNode.attribs) {
        if (domNode.name === "img") {
          const { src, alt } = domNode.attribs;
          return (
            <Image
              src={src}
              alt={alt}
              width={1280}
              height={620}
              className="my-3 h-auto max-h-[300px] w-full rounded-md object-cover object-center md:max-h-[500px]"
            />
          );
        }
      }
    },
  };

  const getParsedHtml = (body: string) => parse(body, options);

  return <div className="parsed-body w-full">{getParsedHtml(body)}</div>;
}

export default PostBody;
