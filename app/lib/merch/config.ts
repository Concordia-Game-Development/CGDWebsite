import merchConfigData from "~/siteSettings/merch.json";
import { MerchCatalog } from "./models";
import type { MerchPageConfigDTO } from "./types";

export const merchCatalog = MerchCatalog.fromConfig(
  merchConfigData as MerchPageConfigDTO
);
