import cosmicJamGalleryData from "~/siteSettings/cosmicjam/gallery.json";
import cosmicJamJudgingData from "~/siteSettings/cosmicjam/judging.json";
import cosmicJamMentorsData from "~/siteSettings/cosmicjam/mentors.json";
import cosmicJamPartnersData from "~/siteSettings/cosmicjam/partners.json";
import cosmicJamScheduleData from "~/siteSettings/cosmicjam/schedule.json";
import cosmicJamVenueData from "~/siteSettings/cosmicjam/venue.json";
import cosmicJamWinnersData from "~/siteSettings/cosmicjam/winners.json";
import shrekathonGalleryData from "~/siteSettings/shrekathon/gallery.json";
import shrekathonJudgingData from "~/siteSettings/shrekathon/judging.json";
import shrekathonMentorsData from "~/siteSettings/shrekathon/mentors.json";
import shrekathonPartnersData from "~/siteSettings/shrekathon/partners.json";
import shrekathonScheduleData from "~/siteSettings/shrekathon/schedule.json";
import shrekathonVenueData from "~/siteSettings/shrekathon/venue.json";
import shrekathonWinnersData from "~/siteSettings/shrekathon/winners.json";
import learnathonMentorsData from "~/siteSettings/learnathon/mentors.json";
import learnathonShadowersData from "~/siteSettings/learnathon/shadowers.json";
import learnathonScheduleData from "~/siteSettings/learnathon/schedule.json";
import learnathonVenueData from "~/siteSettings/learnathon/venue.json";
import type {
  GalleryData,
  JudgingData,
  Mentor,
  Partner,
  ScheduleDay,
  VenueData,
  Winner,
  Shadower,
} from "./types";

export const shrekathonMentors = shrekathonMentorsData as Mentor[];
export const shrekathonSchedule = shrekathonScheduleData as ScheduleDay[];
export const shrekathonPartners = shrekathonPartnersData as Partner[];
export const shrekathonGallery = shrekathonGalleryData as GalleryData;
export const shrekathonVenue = shrekathonVenueData as VenueData;
export const shrekathonJudging = shrekathonJudgingData as JudgingData;
export const shrekathonWinners = shrekathonWinnersData as Winner[];

export const cosmicJamMentors = cosmicJamMentorsData as Mentor[];
export const cosmicJamSchedule = cosmicJamScheduleData as ScheduleDay[];
export const cosmicJamPartners = cosmicJamPartnersData as Partner[];
export const cosmicJamGallery = cosmicJamGalleryData as GalleryData;
export const cosmicJamVenue = cosmicJamVenueData as VenueData;
export const cosmicJamJudging = cosmicJamJudgingData as JudgingData;
export const cosmicJamWinners = cosmicJamWinnersData as Winner[];

export const learnathonMentors = learnathonMentorsData as Mentor[];
export const learnathonShadowers = learnathonShadowersData as Shadower[];
export const learnathonSchedule = learnathonScheduleData as ScheduleDay[];
export const learnathonVenue = learnathonVenueData as VenueData;
