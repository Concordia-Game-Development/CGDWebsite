export type MerchCategory = "Apparel" | "Limited Drop" | "Stickers & Pins";

export type MerchBadge = "BESTSELLER" | "NEW" | "LIMITED";

export interface ColorSwatch {
  readonly name: string;
  readonly hex: string;
}

export interface MerchImageDTO {
  readonly src: string;
  readonly alt: string;
  readonly colourway?: string;
}

export interface BaseMerchItemDTO {
  readonly id: string;
  readonly name: string;
  readonly category: MerchCategory;
  readonly priceCad: number;
  readonly description: string;
  readonly ctaLabel: string;
  readonly images: readonly MerchImageDTO[];
  readonly badge?: MerchBadge;
  readonly featuredLabel?: string;
  readonly isFeatured?: boolean;
  readonly swatches?: readonly ColorSwatch[];
}

export interface ApparelMerchItemDTO extends BaseMerchItemDTO {
  readonly kind: "apparel";
  readonly sizes: readonly string[];
  readonly fitNote: string;
}

export interface AccessoryMerchItemDTO extends BaseMerchItemDTO {
  readonly kind: "accessory";
  readonly packDetails: string;
}

export type MerchItemDTO = ApparelMerchItemDTO | AccessoryMerchItemDTO;

export interface ZeffyCampaignDTO {
  readonly formPath: string;
  readonly baseUrl: string;
  readonly scriptUrl: string;
  readonly iframeTitle: string;
  readonly fallbackHeightPx: number;
}

export interface SizeRowDTO {
  readonly size: string;
  readonly measurements: readonly string[];
}

export interface SizeChartDTO {
  readonly id: string;
  readonly label: string;
  readonly columns: readonly string[];
  readonly rows: readonly SizeRowDTO[];
}

export interface SizeGuideDTO {
  readonly title: string;
  readonly subtitle: string;
  readonly note: string;
  readonly charts: readonly SizeChartDTO[];
}

export interface MerchHeroDTO {
  readonly title: string;
  readonly subtitle: string;
  readonly primaryCtaLabel: string;
  readonly secondaryCtaLabel: string;
  readonly trustPoints: readonly string[];
}

export interface MerchSectionCopyDTO {
  readonly title: string;
  readonly subtitle: string;
}

export interface MerchOrderSectionDTO extends MerchSectionCopyDTO {
  readonly id: string;
  readonly zeffyNote: string;
  readonly zeffyCampaign: ZeffyCampaignDTO;
}

export interface MerchAccessGateDTO {
  readonly enabled: boolean;
  readonly code: string;
  readonly title: string;
  readonly subtitle: string;
}

export interface MerchPageConfigDTO {
  readonly accessGate?: MerchAccessGateDTO;
  readonly hero: MerchHeroDTO;
  readonly catalogSection: MerchSectionCopyDTO;
  readonly orderSection: MerchOrderSectionDTO;
  readonly sizeGuide: SizeGuideDTO;
  readonly items: readonly MerchItemDTO[];
}
