import { TaskProvider } from "@/contexts/TaskContext";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TaskProvider>{children}</TaskProvider>;
}
