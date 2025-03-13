"use client"

import React from "react"
import { ThemeProvider } from "@/features/theme/theme-provider"
import { queryClient } from "@/shared/api/query-client"
import { ComposeChildren } from "@/shared/lib/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ComposeChildren>
        <ThemeProvider />
        <QueryClientProvider client={queryClient} />
        {children}
      </ComposeChildren>
    </SessionProvider>
  )
}
