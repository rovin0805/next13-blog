import Link from "next/link";
import React from "react";
import PaddingContainer from "../layout/padding-container";
import { getDictionary } from "@/lib/getDictionary";
import LangSwitcher from "./lang-switcher";

const Navigation = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);

  return (
    <div className="sticky left-0 right-0 top-0 z-[999] border-b bg-white bg-opacity-50 backdrop-blur-md">
      <PaddingContainer>
        <div className="flex items-center justify-between py-5">
          <Link href={`/${locale}`} className="text-lg font-bold">
            Explorer
          </Link>
          <nav>
            <ul className="flex items-center gap-4 text-neutral-600">
              <li>
                <LangSwitcher locale={locale} />
              </li>
              <li>
                <Link href={`/${locale}/cities`}>
                  {dictionary.navigation.links.cities}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/experiences`}>
                  {dictionary.navigation.links.experiences}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Navigation;
