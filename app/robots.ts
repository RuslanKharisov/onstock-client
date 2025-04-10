import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/stock"],
        disallow: ["/stock?*description*", "/stock?*sku*"],
      },
    ],
    sitemap: "https://prom-stock.ru/sitemap.xml",
  };
}