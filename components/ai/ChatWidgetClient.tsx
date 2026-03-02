"use client";

import { usePathname } from "next/navigation";
import { ChatWidget } from "./ChatWidget";

export function ChatWidgetClient() {
  const pathname = usePathname();
  return <ChatWidget pageContext={pathname} />;
}