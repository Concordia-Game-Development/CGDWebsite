export type Mentor = {
  name: string;
  role: string;
  image: string;
  favoriteGame?: string;
  workshop?: string;
};

export type Shadower = {
  name: string;
  image: string;
};

export type Partner = {
  name: string;
  logo: string;
  link?: string;
};

export type GalleryData = {
  title: string;
  eventName: string;
  images: string[];
};

export type ScheduleEvent = {
  time: string;
  title: string;
};

export type ScheduleDay = {
  day: string;
  events: ScheduleEvent[];
};

export type VenueLab = {
  room: string;
  type: string;
  footnoteMarker?: string;
  days?: string;
};

export type VenueData = {
  university: string;
  building: string;
  introduction: string;
  rooms: Array<{ day: string; room: string }>;
  labs: VenueLab[];
  note: string;
  workstationFootnote: string;
  floorPlan?: {
    src: string;
    alt: string;
  };
};

export type JudgingAward = {
  name: string;
  prize: string;
};

export type JudgingData = {
  introduction: string;
  process: string;
  criteria: Array<{ name: string; max: number }>;
  awards: JudgingAward[];
  prizeImage: string;
  prizeImageAlt: string;
};

export type Winner = {
  category: string;
  name: string;
  link?: string;
};
