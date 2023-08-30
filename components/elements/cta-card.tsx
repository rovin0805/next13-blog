import directus from "@/lib/directus";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import React from "react";

export const REVALIDATE_TAG = "subscribers-count";

async function CtaCard() {
  // TODO: fix
  async function formAction(formData: FormData) {
    "use server";
    try {
      const email = formData.get("email");
      await directus.items("subscribers").createOne({ email });
      revalidateTag(REVALIDATE_TAG);
    } catch (error) {
      console.log("🚀 ~ file: cta-card.tsx:9 ~ formAction ~ error:", error);
    }
  }

  const subscribersCount = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/items/subscribers?meta=total_count&access_token=${process.env.ADMIN_TOKEN}`,
    {
      next: {
        tags: [REVALIDATE_TAG],
      },
    },
  )
    .then((res) => res.json())
    .then((res) => {
      if (!!res.errors) {
        throw new Error(res.errors[0].message);
      }
      return res.meta.total_count;
    })
    .catch((err) => {
      console.log("🚀 ~ file: cta-card.tsx:29 ~ .catch ~ err:", err);
      return 0;
    });

  return (
    <div className="relative overflow-hidden rounded-md bg-slate-100 px-6 py-10">
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/60 to-white/30" />

      <Image
        src={
          "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?ixid=MnwzODU2NTF8MHwxfHNlYXJjaHwxN3x8Q2FwcGFkb2NpYXxlbnwwfHx8fDE2NzAzMjI2OTE&ixlib=rb-4.0.3"
        }
        fill
        className="object-cover object-center"
        alt="cta"
      />

      <div className="relative z-20">
        <div className="text-lg font-medium">#exploreTheWorld</div>
        <h3 className="mt-3 text-4xl font-semibold">
          Explore the world with me!
        </h3>
        <p className="mt-2 max-w-lg text-lg">
          Explore the world with me! {"I'"}m traveling around the world. {"I'"}
          ve visited most of countries and currently {"I'"}m traveling in Korea!
          Join me!
        </p>

        <form
          key={subscribersCount + "form"}
          action={formAction}
          className="mt-6 flex w-full items-center gap-2"
        >
          <input
            type="email"
            placeholder="Write your email."
            className="w-full rounded-md bg-white/80 px-3 py-2 text-base outline-none ring-neutral-600 placeholder:text-sm focus:ring-2 md:w-auto"
          />
          <button className="whitespace-nowrap rounded-md bg-neutral-900 px-3 py-2 text-neutral-200">
            Sign Up
          </button>
        </form>

        <div className="mt-5 text-neutral-700">
          Join our{" "}
          <span className="rounded-md bg-neutral-700 px-2 py-1 text-sm text-neutral-100">
            {subscribersCount}
          </span>{" "}
          subscribers now!
        </div>
      </div>
    </div>
  );
}

export default CtaCard;
