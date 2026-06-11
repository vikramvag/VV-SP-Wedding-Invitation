import { DayPlan, RSVPResponse } from './types';

export const ITINERARY: DayPlan[] = [
  {
    dayNumber: 1,
    date: "Saturday, August 8, 2026",
    subtitle: "The Festive Pre-Wedding Rites",
    events: [
      {
        id: "d1-1",
        time: "10:30 AM",
        title: "Ganesh Puja & Shagun",
        description: "An auspicious commencement seeking universal blessings, followed by traditional henna mehendi applications for the family.",
        dressCode: "Festive Yellow, Ochre, or Vibrant Citrus Colors",
        location: "The Golden Leaf Courtyard"
      },
      {
        id: "d1-2",
        time: "06:30 PM",
        title: "Sangeet Night & Ring Exchange",
        description: "A spectacular night of synchronized dances, dynamic folk songs, and the official ring exchange. Dinner and drinks will be served.",
        dressCode: "Glimmering Lehengas, Sherwanis, or Evening Tuxedos",
        location: "The Imperial Ballroom Star-deck"
      }
    ]
  },
  {
    dayNumber: 2,
    date: "Sunday, August 9, 2026",
    subtitle: "The Main Royal Wedding Day",
    events: [
      {
        id: "d2-1",
        time: "09:30 AM",
        title: "Baraat Procession & Milni",
        description: "Join Vikram's jubilant royal horse caravan at the gate, followed by a warm reception and garland exchange by Sweta's loving family.",
        dressCode: "Classic Royal Sherwani, Bandhgala, or Elegant Suits",
        location: "The Palace Entrance Gardens"
      },
      {
        id: "d2-2",
        time: "11:30 AM",
        title: "Sacred Phere (Vows)",
        description: "Under a Mandap of white orchids, Vikram & Sweta will walk the sacred seven circles around the fire, binding their souls for seven lifetimes.",
        dressCode: "Traditional Indian Silk, Red, Gold, or Peach Traditional Wear",
        location: "The Lotus Pavilion Mandap"
      },
      {
        id: "d2-3",
        time: "07:00 PM",
        title: "Grand Banquet Reception",
        description: "Celebrate the newlywed union with a gourmet gala buffet, heartfelt toasts, bridal waltzes, and dancing under the golden crystal chandeliers.",
        dressCode: "Formal Indian Royale or Black Tie Formal wear",
        location: "The Grand Royal Crystal Palace"
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
    mealPreference: "Vegan",
    blessing: "An incredible couple. Wishing you a lifetimes of deep laughs, stunning adventures, and delicious dinners. Can't wait to celebrate on August 9th!",
    submittedAt: "2026-06-10T12:05:00Z"
  }
];
