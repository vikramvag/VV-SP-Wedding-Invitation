/**
 * Shared Type Declarations for Sweta & Vikram Wedding RSVP & Invitation.
 */

export interface EventItem {
  id: string;
  time: string;
  title: string;
  description: string;
  dressCode: string;
  location: string;
}

export interface DayPlan {
  dayNumber: number;
  date: string;
  subtitle: string;
  events: EventItem[];
}

export type AttendanceStatus = 'Attending' | 'Unsure' | 'Declined';

export type MealOption = 'Vegetarian' | 'Non-Vegetarian' | 'Vegan';

export interface RSVPResponse {
  id: string;
  guestName: string;
  phoneOrEmail: string;
  attendance: AttendanceStatus;
  mealPreference: MealOption;
  blessing: string;
  submittedAt: string;
}
