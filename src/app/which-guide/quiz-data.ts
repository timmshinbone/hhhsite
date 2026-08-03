// Which Guide Are You? — quiz content + recommendation logic

export interface WhichGuideQuestion {
  key: string;
  label: string;
  q: string;
  options: Array<{
    text: string;
    erlb: number;
    pgl: number;
  }>;
}

export type Recommendation = "erlb" | "pgl";
export type WhichGuideAnswers = (number | null)[];

export const QUESTIONS: WhichGuideQuestion[] = [
  {
    key: "frustration",
    label: "Your biggest challenge",
    q: "What's your biggest frustration with food right now?",
    options: [
      {
        text: "I don't really know what 'healthy' means, everything online seems contradictory",
        erlb: 1,
        pgl: 0,
      },
      {
        text: "I know what I should eat, but my grocery trips are chaotic and over budget",
        erlb: 0,
        pgl: 1,
      },
      { text: "Honestly, both feel true", erlb: 1, pgl: 1 },
    ],
  },
  {
    key: "labels",
    label: "Ingredient labels",
    q: "When you see a long ingredient list on a packaged food, you:",
    options: [
      { text: "Don't really pay attention to it", erlb: 1, pgl: 0 },
      {
        text: "Check it, but can't figure out what most of the ingredients mean",
        erlb: 1,
        pgl: 0,
      },
      {
        text: "Know the red flags, I just struggle to stick to my list in the store",
        erlb: 0,
        pgl: 1,
      },
    ],
  },
  {
    key: "planning",
    label: "Meal planning",
    q: "How do you usually plan what you'll eat for the week?",
    options: [
      {
        text: "I don't plan, I eat whatever I find or just get takeout",
        erlb: 1,
        pgl: 0,
      },
      {
        text: "I try, but I never have a real system and it falls apart",
        erlb: 0,
        pgl: 1,
      },
      {
        text: "I plan meals, but still overspend or forget things at the store",
        erlb: 0,
        pgl: 1,
      },
    ],
  },
  {
    key: "groceryfeel",
    label: "After the grocery run",
    q: "When you finish a grocery run, you usually feel:",
    options: [
      {
        text: "Like I grabbed stuff I shouldn't have, without knowing exactly why",
        erlb: 1,
        pgl: 0,
      },
      {
        text: "Like I forgot half my list and spent way more than I planned",
        erlb: 0,
        pgl: 1,
      },
      {
        text: "Okay, but my cart doesn't really reflect how I want to eat",
        erlb: 1,
        pgl: 0,
      },
    ],
  },
  {
    key: "cooking",
    label: "Cooking at home",
    q: "When it comes to cooking at home:",
    options: [
      {
        text: "I want to cook more, but I'm not sure what meals are actually healthy to make",
        erlb: 1,
        pgl: 0,
      },
      {
        text: "I cook fairly regularly, I just need a better shopping system to support it",
        erlb: 0,
        pgl: 1,
      },
      {
        text: "I'd cook more if I had a weekly meal plan to follow",
        erlb: 0,
        pgl: 1,
      },
    ],
  },
  {
    key: "win",
    label: "Biggest win",
    q: "What would feel like the biggest win in the next 30 days?",
    options: [
      {
        text: "Finally having a simple, clear rule for what's real food vs. what isn't",
        erlb: 1,
        pgl: 0,
      },
      {
        text: "Getting in and out of the grocery store with exactly what I need, on budget",
        erlb: 0,
        pgl: 1,
      },
      {
        text: "A complete system: a meal plan, a grocery list, and the confidence to use both",
        erlb: 0,
        pgl: 1,
      },
    ],
  },
  {
    key: "habits",
    label: "Current habits",
    q: "How would you describe your current eating habits?",
    options: [
      {
        text: "Mostly whatever is convenient, I haven't really tried to eat healthier yet",
        erlb: 1,
        pgl: 0,
      },
      {
        text: "I eat pretty well, but my shopping doesn't always match my intentions",
        erlb: 0,
        pgl: 1,
      },
      {
        text: "I'm already health-conscious, I just need a smarter grocery routine",
        erlb: 0,
        pgl: 1,
      },
    ],
  },
];

export function getRecommendation(answers: WhichGuideAnswers): Recommendation {
  let erlb = 0;
  let pgl = 0;
  QUESTIONS.forEach((q, i) => {
    const ans = answers[i];
    if (ans !== null && ans !== undefined) {
      erlb += q.options[ans]?.erlb ?? 0;
      pgl += q.options[ans]?.pgl ?? 0;
    }
  });
  return erlb > pgl ? "erlb" : "pgl";
}
