export const PROPERTY_OPTIONS = {
  flexDirection: ["row", "row-reverse", "column", "column-reverse"],
  justifyContent: [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ],
  alignItems: ["flex-start", "flex-end", "center", "stretch", "baseline"],
  flexWrap: ["nowrap", "wrap", "wrap-reverse"],
};

export const DEFAULT_VALUES = {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexWrap: "nowrap",
};

export const FLEX_PROPERTY_KEYS = [
  "flexDirection",
  "justifyContent",
  "alignItems",
  "flexWrap",
];

export const LEVELS = [
  {
    instruction:
      "Before kick-off, four red strikers spread across the top of the pitch in one row. " +
      "Keep them level with the top edge and give every player the same amount of free space around them.",
    items: [
      { type: "player", team: "red", label: "7" },
      { type: "player", team: "red", label: "9" },
      { type: "player", team: "red", label: "10" },
      { type: "player", team: "red", label: "11" },
    ],
    startValues: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
    },
    solution: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "flex-start",
      flexWrap: "nowrap",
    },
  },
  {
    instruction:
      "Four blue full-backs must stand side by side in one horizontal row. " +
      "Move the whole row to the left-hand side of the pitch - as far left as you can. " +
      "The row must sit halfway up the pitch, with the same empty space above the players as below them.",
    items: [
      { type: "player", team: "blue", label: "2" },
      { type: "player", team: "blue", label: "3" },
      { type: "player", team: "blue", label: "4" },
      { type: "player", team: "blue", label: "5" },
    ],
    startValues: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      flexWrap: "nowrap",
    },
    solution: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "nowrap",
    },
  },
  {
    instruction:
      "Four gold substitutes must form a single vertical queue on the left side of the pitch. " +
      "Put player #12 in the bottom-left corner. " +
      "Place #14 directly above #12, then #16 above #14, and #18 at the top of the line.",
    items: [
      { type: "player", team: "gold", label: "12" },
      { type: "player", team: "gold", label: "14" },
      { type: "player", team: "gold", label: "16" },
      { type: "player", team: "gold", label: "18" },
    ],
    startValues: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      flexWrap: "nowrap",
    },
    solution: {
      flexDirection: "column-reverse",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexWrap: "nowrap",
    },
  },
  {
    instruction:
      "Three blue players stretch along the right touchline in a vertical line. " +
      "Pin one player beside the top goal, one beside the bottom goal, " +
      "and let the middle player sit halfway between them on the far-right edge.",
    items: [
      { type: "player", team: "blue", label: "6" },
      { type: "player", team: "blue", label: "8" },
      { type: "player", team: "blue", label: "15" },
    ],
    startValues: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
    },
    solution: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexWrap: "nowrap",
    },
  },
  {
    instruction:
      "Halftime huddle! Place the striker, the ball, and the goalkeeper in one vertical column. " +
      "The whole huddle must sit in the exact centre of the pitch.",
    items: [
      { type: "player", team: "red", label: "9" },
      { type: "ball" },
      { type: "player", team: "blue", label: "1" },
    ],
    startValues: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexWrap: "nowrap",
    },
    solution: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
    },
  },
  {
    instruction:
      "Four red midfielders jog back in reverse shirt order along the bottom edge. " +
      "Keep them on the bottom line with the same amount of space around every player.",
    items: [
      { type: "player", team: "red", label: "7" },
      { type: "player", team: "red", label: "8" },
      { type: "player", team: "red", label: "10" },
      { type: "player", team: "red", label: "11" },
    ],
    startValues: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexWrap: "nowrap",
    },
    solution: {
      flexDirection: "row-reverse",
      justifyContent: "space-around",
      alignItems: "flex-end",
      flexWrap: "nowrap",
    },
  },
  {
    instruction:
      "Three blue players lead a high press across the top of the pitch in one row. " +
      "Anchor the first player on the far-left corner and the last player on the far-right corner.",
    items: [
      { type: "player", team: "blue", label: "4" },
      { type: "player", team: "blue", label: "5" },
      { type: "player", team: "blue", label: "6" },
    ],
    startValues: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-end",
      flexWrap: "nowrap",
    },
    solution: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "nowrap",
    },
  },
  {
    instruction:
      "Twelve gold substitutes are warming up - too many to fit on a single line. " +
      "Let the squad break into two rows. " +
      "Centre the whole group on the pitch and keep even spacing around every player.",
    crowded: true,
    items: [
      { type: "player", team: "gold", label: "12" },
      { type: "player", team: "gold", label: "13" },
      { type: "player", team: "gold", label: "14" },
      { type: "player", team: "gold", label: "15" },
      { type: "player", team: "gold", label: "16" },
      { type: "player", team: "gold", label: "17" },
      { type: "player", team: "gold", label: "18" },
      { type: "player", team: "gold", label: "19" },
      { type: "player", team: "gold", label: "20" },
      { type: "player", team: "gold", label: "21" },
      { type: "player", team: "gold", label: "22" },
      { type: "player", team: "gold", label: "23" },
    ],
    startValues: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexWrap: "nowrap",
    },
    solution: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      flexWrap: "wrap",
    },
  },
  {
    instruction:
      "Twelve red wingers cannot all fit side by side during sprint drills. " +
      "Let them form two rows. " +
      "Push the whole group up against the top edge of the pitch, as close to the top goal as you can. " +
      "Pull the whole group toward the right-hand side of the pitch.",
    crowded: true,
    items: [
      { type: "player", team: "red", label: "7" },
      { type: "player", team: "red", label: "11" },
      { type: "player", team: "red", label: "17" },
      { type: "player", team: "red", label: "19" },
      { type: "player", team: "red", label: "20" },
      { type: "player", team: "red", label: "21" },
      { type: "player", team: "red", label: "22" },
      { type: "player", team: "red", label: "23" },
      { type: "player", team: "red", label: "24" },
      { type: "player", team: "red", label: "25" },
      { type: "player", team: "red", label: "26" },
      { type: "player", team: "red", label: "27" },
    ],
    startValues: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      flexWrap: "nowrap",
    },
    solution: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      flexWrap: "wrap",
    },
  },
  {
    instruction:
      "On a counter-attack the front line bursts forward in reverse running order. " +
      "Show all four figures (three players and the ball) in that reversed order with equal gaps between them. " +
      "Keep them in one horizontal band across the middle height of the pitch.",
    items: [
      { type: "player", team: "red", label: "7" },
      { type: "player", team: "red", label: "10" },
      { type: "player", team: "red", label: "11" },
      { type: "ball" },
    ],
    startValues: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexWrap: "nowrap",
    },
    solution: {
      flexDirection: "row-reverse",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexWrap: "nowrap",
    },
  },
];
