"use client";

import { ElementType } from "react";
import { useLang } from "../Header/LangContext";
import { useTranslateText } from "../Header/useTranslate";

export default function TranslatableText({
  text,
  as: Tag = "span",
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const { lang } = useLang();
  const { translated, isLoading } = useTranslateText(text, lang);

  return (
    <Tag className={className} style={isLoading ? { opacity: 0.5 } : undefined}>
      {translated}
    </Tag>
  );
}
