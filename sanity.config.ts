"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";
import { env } from "./src/lib/env";

export default defineConfig({
  name: "default",
  title: "Best Teleprodukter",
  basePath: "/studio",
  projectId: env.sanity.projectId || "your-project-id",
  dataset: env.sanity.dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
