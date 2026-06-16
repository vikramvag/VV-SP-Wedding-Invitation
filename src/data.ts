import { DayPlan, RSVPResponse } from './types';

export const ITINERARY: DayPlan[] = [
  {
    dayNumber: 1,
    date: "Saturday, August 8, 2026",
    subtitle: "The Festive Pre-Wedding Rites",
    events: [
      {
        id: "d1-1",
        time: "10:00 AM",
        title: "Ganesh Pooja & Haldi Ceremony",
        description: "A joyous pre-wedding ritual that symbolizes spiritual purification, protection from negative energies, and the blessing of prosperity before they begin their new married life",
        location: "1069, McBride Avenue, Mississauga"
      },
      {
        id: "d1-lunch",
        time: "12:00 PM",
        title: "Lunch",
        location: "1069, McBride Avenue, Mississauga"
      },
      {
        id: "d1-2",
        time: "01:00 PM",
        title: "Mehendi & Shagun",
        description: "A sacred pre-wedding ritual symbolizing prosperity, good fortune, strengthening of marital bonds & lifelong devotion between the couple",
        location: "1069, McBride Avenue, Mississauga"
      }
    ]
  },
  {
    dayNumber: 2,
    date: "Sunday, August 9, 2026",
    subtitle: "The one where they get married",
    events: [
      {
        id: "d2-1",
        time: "04:00 PM",
        title: "Wedding Ceremony",
        description: "Witness the joyful union of Sweta & Vikram as they exchange garlands and complete the sacred Saptapadi. Surrounded by family to witness their first steps as husband and wife.",
        location: "1069, McBride Avenue, Mississauga"
      },
      {
        id: "d2-2",
        time: "05:30 PM",
        title: "Fun and Games",
        description: "Let the friendly rivalry begin! Join us for a lively afternoon of traditional wedding games, laughter, and lighthearted competition as family & friends battle it out for bragging rights.",
        location: "1069, McBride Avenue, Mississauga"
      },
      {
        id: "d2-dinner",
        time: "07:30 PM",
        title: "Dinner",
        location: "1069, McBride Avenue, Mississauga"
      }
    ]
  }
];

export const INITIAL_REGISTRY: RSVPResponse[] = [
  {
    id: "pre-1",
    guestName: "Aunty Priya & Uncle Amit",
    phoneOrEmail: "priya.amit@example.com",
    attendance: "Attending",
    mealPreference: "Vegetarian",
    blessing: "Dearest Sweta and Vikram, so thrilled to witness this beautiful union! May you both be blessed with immense joy, patience and love throughout your lives.",
    submittedAt: "2026-06-05T10:14:00Z"
  },
  {
    id: "pre-2",
    guestName: "Rohan Malhotra",
    phoneOrEmail: "rohan@example.com",
    attendance: "Attending",
    mealPreference: "Non-Vegetarian",
    blessing: "Vikram, my brother! Can't wait to dance at your Baraat and tear up the dance floor! Sweta, welcome to the crazy circle. Congratulations guys!",
    submittedAt: "2026-06-08T18:42:00Z"
  },
  {
    id: "pre-3",
    guestName: "Anjali & Kabir Sen",
    phoneOrEmail: "anjali26@example.com",
    attendance: "Attending",
    mealPreference: "Vegetarian",
    blessing: "An incredible couple. Wishing you a lifetimes of deep laughs, stunning adventures, and delicious dinners. Can't wait to celebrate on August 9th!",
    submittedAt: "2026-06-10T12:05:00Z"
  }
];
