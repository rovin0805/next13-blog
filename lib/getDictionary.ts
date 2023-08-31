const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  kr: () => import("../dictionaries/kr.json").then((module) => module.default),
};

type DictionaryKeys = keyof typeof dictionaries;

export const getDictionary = async (locale: string) => {
  if (!locale) {
    return dictionaries["en"]();
  } else {
    return dictionaries[locale as DictionaryKeys]();
  }
};
