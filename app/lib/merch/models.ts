import type {
  AccessoryMerchItemDTO,
  ApparelMerchItemDTO,
  BaseMerchItemDTO,
  ColorSwatch,
  MerchAccessGateDTO,
  MerchBadge,
  MerchCategory,
  MerchHeroDTO,
  MerchImageDTO,
  MerchItemDTO,
  MerchOrderSectionDTO,
  MerchPageConfigDTO,
  MerchSectionCopyDTO,
  SizeChartDTO,
  SizeGuideDTO,
  ZeffyCampaignDTO,
} from "./types";

/** Base domain model for a CGD merchandise product. */
export abstract class MerchProduct {
  readonly id: string;
  readonly name: string;
  readonly category: MerchCategory;
  readonly priceCad: number;
  readonly description: string;
  readonly ctaLabel: string;
  readonly images: readonly MerchImageDTO[];
  readonly badge?: MerchBadge;
  readonly featuredLabel?: string;
  readonly isFeatured: boolean;
  readonly swatches: readonly ColorSwatch[];

  protected constructor(dto: BaseMerchItemDTO) {
    if (dto.images.length === 0) {
      throw new Error(`MerchProduct "${dto.id}" must define at least one image.`);
    }

    this.id = dto.id;
    this.name = dto.name;
    this.category = dto.category;
    this.priceCad = dto.priceCad;
    this.description = dto.description;
    this.ctaLabel = dto.ctaLabel;
    this.images = dto.images;
    this.badge = dto.badge;
    this.featuredLabel = dto.featuredLabel;
    this.isFeatured = dto.isFeatured ?? false;
    this.swatches = dto.swatches ?? [];
  }

  get formattedPrice(): string {
    return `$${this.priceCad.toFixed(2)}`;
  }

  get primaryImage(): MerchImageDTO {
    return this.images[0];
  }

  get hasMultipleImages(): boolean {
    return this.images.length > 1;
  }

  get hasSwatches(): boolean {
    return this.swatches.length > 0;
  }

  get featuredBannerText(): string {
    return this.featuredLabel ?? this.badge ?? this.category;
  }

  getImageIndexForColourway(colourwayName: string): number {
    return this.images.findIndex((img) => img.colourway === colourwayName);
  }

  getColourwayForImageIndex(index: number): string | undefined {
    return this.images[index]?.colourway;
  }

  getPrimaryImageForColourway(colourwayName?: string): MerchImageDTO {
    if (!colourwayName) {
      return this.primaryImage;
    }

    return (
      this.images.find((img) => img.colourway === colourwayName) ??
      this.primaryImage
    );
  }

  abstract get hasSizing(): boolean;
  abstract get sizeOptions(): readonly string[];
  abstract get detailHighlights(): readonly string[];
}

/** Apparel merchandise item with garment sizes and fit notes. */
export class ApparelProduct extends MerchProduct {
  readonly sizes: readonly string[];
  readonly fitNote: string;

  constructor(dto: ApparelMerchItemDTO) {
    super(dto);
    this.sizes = dto.sizes;
    this.fitNote = dto.fitNote;
  }

  get hasSizing(): boolean {
    return true;
  }

  get sizeOptions(): readonly string[] {
    return this.sizes;
  }

  get detailHighlights(): readonly string[] {
    return [this.fitNote];
  }
}

/** Non-apparel merchandise item such as sticker packs or pins. */
export class AccessoryProduct extends MerchProduct {
  readonly packDetails: string;

  constructor(dto: AccessoryMerchItemDTO) {
    super(dto);
    this.packDetails = dto.packDetails;
  }

  get hasSizing(): boolean {
    return false;
  }

  get sizeOptions(): readonly string[] {
    return [];
  }

  get detailHighlights(): readonly string[] {
    return [this.packDetails];
  }
}

/** Encapsulates the Zeffy inline embed URLs and fallback iframe settings. */
export class ZeffyCampaign {
  readonly formPath: string;
  readonly baseUrl: string;
  readonly scriptUrl: string;
  readonly iframeTitle: string;
  readonly fallbackHeightPx: number;

  constructor(dto: ZeffyCampaignDTO) {
    this.baseUrl = dto.baseUrl.replace(/\/+$/, "");
    this.formPath = dto.formPath.startsWith("/") ? dto.formPath : `/${dto.formPath}`;
    this.scriptUrl = dto.scriptUrl;
    this.iframeTitle = dto.iframeTitle;
    this.fallbackHeightPx = dto.fallbackHeightPx;
  }

  get embedUrl(): string {
    return `${this.baseUrl}${this.formPath}`;
  }
}

/** Holds sizing charts and garment fit guidance for the size guide drawer. */
export class SizeGuide {
  readonly title: string;
  readonly subtitle: string;
  readonly note: string;
  readonly charts: readonly SizeChartDTO[];

  constructor(dto: SizeGuideDTO) {
    this.title = dto.title;
    this.subtitle = dto.subtitle;
    this.note = dto.note;
    this.charts = dto.charts;
  }
}

/** Controls pre-launch access gating for the merch preview page. */
export class MerchAccessGate {
  readonly enabled: boolean;
  readonly title: string;
  readonly subtitle: string;
  readonly storageKey = "cgd-merch-access-unlocked";
  private readonly code: string;

  constructor(dto?: MerchAccessGateDTO) {
    this.enabled = dto?.enabled ?? false;
    this.title = dto?.title ?? "";
    this.subtitle = dto?.subtitle ?? "";
    this.code = (dto?.code ?? "").trim().toUpperCase();
  }

  verifyCode(input: string): boolean {
    if (!this.enabled) {
      return true;
    }
    return input.trim().toUpperCase() === this.code;
  }
}

/** Aggregate root providing typed access to merch copy, products, size guide, and Zeffy config. */
export class MerchCatalog {
  readonly accessGate: MerchAccessGate;
  readonly hero: MerchHeroDTO;
  readonly catalogSection: MerchSectionCopyDTO;
  readonly orderSection: MerchOrderSectionDTO;
  readonly campaign: ZeffyCampaign;
  readonly sizeGuide: SizeGuide;
  private readonly products: readonly MerchProduct[];

  private constructor(
    config: MerchPageConfigDTO,
    products: readonly MerchProduct[]
  ) {
    this.accessGate = new MerchAccessGate(config.accessGate);
    this.hero = config.hero;
    this.catalogSection = config.catalogSection;
    this.orderSection = config.orderSection;
    this.campaign = new ZeffyCampaign(config.orderSection.zeffyCampaign);
    this.sizeGuide = new SizeGuide(config.sizeGuide);
    this.products = products;
  }

  static fromConfig(config: MerchPageConfigDTO): MerchCatalog {
    const products = config.items.map((item) => MerchCatalog.createProduct(item));
    return new MerchCatalog(config, products);
  }

  private static createProduct(dto: MerchItemDTO): MerchProduct {
    switch (dto.kind) {
      case "apparel":
        return new ApparelProduct(dto);
      case "accessory":
        return new AccessoryProduct(dto);
      default: {
        const exhaustiveCheck: never = dto;
        throw new Error(`Unsupported merch item kind: ${JSON.stringify(exhaustiveCheck)}`);
      }
    }
  }

  getAllProducts(): readonly MerchProduct[] {
    return this.products;
  }

  getFeaturedProduct(): MerchProduct | undefined {
    return this.products.find((product) => product.isFeatured) ?? this.products[0];
  }

  getProductById(id: string): MerchProduct | undefined {
    return this.products.find((product) => product.id === id);
  }

  getCategories(): readonly MerchCategory[] {
    return Array.from(new Set(this.products.map((product) => product.category)));
  }

  getProductsByCategory(category: MerchCategory): readonly MerchProduct[] {
    return this.products.filter((product) => product.category === category);
  }
}
