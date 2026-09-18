import {
  LEVELS,
  PROPERTY_OPTIONS,
  DEFAULT_VALUES,
  FLEX_PROPERTY_KEYS,
} from "./levels.js";

const pitch = document.getElementById("pitch");
const pitchField = document.getElementById("pitch-field");

const PITCH_FIELD_WIDTH = 456;
const PITCH_FIELD_HEIGHT = 288;
const CROWD_ROW_GAP = 8;
const CROWD_COL_GAP = 6;
const instruction = document.getElementById("instruction");
const levelIndicator = document.getElementById("level-indicator");
const levelDots = document.getElementById("level-dots");
const attemptsCount = document.getElementById("attempts");
const feedback = document.getElementById("feedback");
const checkBtn = document.getElementById("check-btn");
const discoverBtn = document.getElementById("discover-btn");
const resetBtn = document.getElementById("reset-btn");
const nextBtn = document.getElementById("next-btn");
const solutionPanel = document.getElementById("solution-panel");
const solutionList = document.getElementById("solution-list");
const prevLevelBtn = document.getElementById("prev-level-btn");
const nextLevelBtn = document.getElementById("next-level-btn");
const celebration = document.getElementById("celebration");

let currentLevel = 0;
let attempts = 0;
let solved = false;
let revealed = false;
let completedLevels = [];
let maxReachedLevel = 0;
let flexValues = { ...DEFAULT_VALUES };
let celebrationTimer = null;

const CELEBRATION_TIME = 3200;
const STORAGE_LEVEL_KEY = "flexPitch-level";
const STORAGE_DONE_KEY = "flexPitch-done";
const STORAGE_MAX_KEY = "flexPitch-max";
const STORAGE_VERSION_KEY = "flexPitch-version";
const PROGRESS_VERSION = "2";

const propertyToCss = (name) =>
  name.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());

const saveProgress = () => {
  localStorage.setItem(STORAGE_LEVEL_KEY, String(currentLevel));
  localStorage.setItem(STORAGE_DONE_KEY, completedLevels.join(","));
  localStorage.setItem(STORAGE_MAX_KEY, String(maxReachedLevel));
};

const loadProgress = () => {
  const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);

  if (savedVersion !== PROGRESS_VERSION) {
    localStorage.setItem(STORAGE_VERSION_KEY, PROGRESS_VERSION);
    localStorage.removeItem(STORAGE_LEVEL_KEY);
    localStorage.removeItem(STORAGE_DONE_KEY);
    localStorage.removeItem(STORAGE_MAX_KEY);
    completedLevels = [];
    maxReachedLevel = 0;
    currentLevel = 0;
    return;
  }

  const savedDone = localStorage.getItem(STORAGE_DONE_KEY);
  if (savedDone) {
    completedLevels = savedDone
      .split(",")
      .filter((value) => value !== "")
      .map(Number)
      .filter((index) => index >= 0 && index < LEVELS.length);
  }

  sanitizeCompletedLevels();

  const savedLevel = Number(localStorage.getItem(STORAGE_LEVEL_KEY));
  if (!Number.isNaN(savedLevel) && savedLevel >= 0 && savedLevel < LEVELS.length) {
    currentLevel = savedLevel;
  }

  if (currentLevel > getFrontierLevel()) {
    currentLevel = getFrontierLevel();
  }

  const savedMax = Number(localStorage.getItem(STORAGE_MAX_KEY));
  if (!Number.isNaN(savedMax) && savedMax >= 0 && savedMax < LEVELS.length) {
    maxReachedLevel = savedMax;
  }

  maxReachedLevel = Math.max(maxReachedLevel, currentLevel, getFrontierLevel());
};

const sanitizeCompletedLevels = () => {
  const sanitized = [];

  for (let i = 0; i < LEVELS.length; i++) {
    if (completedLevels.includes(i) && (i === 0 || sanitized.includes(i - 1))) {
      sanitized.push(i);
    } else {
      break;
    }
  }

  completedLevels = sanitized;
};

const markCompleted = (index) => {
  if (!completedLevels.includes(index)) {
    completedLevels.push(index);
    completedLevels.sort((a, b) => a - b);
    sanitizeCompletedLevels();
  }
};

const hasBeatenLevel = (index) => completedLevels.includes(index);

const getFrontierLevel = () => {
  for (let i = 0; i < LEVELS.length; i++) {
    if (!completedLevels.includes(i)) {
      return i;
    }
  }

  return LEVELS.length - 1;
};

const canGoToLevel = (index) => {
  if (index < 0 || index >= LEVELS.length) {
    return false;
  }

  if (index <= currentLevel) {
    return true;
  }

  if (index <= maxReachedLevel) {
    return true;
  }

  if (hasBeatenLevel(index)) {
    return true;
  }

  if (index === currentLevel + 1) {
    return solved || hasBeatenLevel(currentLevel);
  }

  return false;
};

const canAdvanceToNextLevel = () => canGoToLevel(currentLevel + 1);

const blockedLevelMessage = (index) => {
  if (index > currentLevel + 1 && index > maxReachedLevel && !hasBeatenLevel(index)) {
    return "Stages unlock one at a time. Beat the next stage in line first.";
  }

  return (
    "Check Formation and beat stage " +
    stageNumber(currentLevel) +
    " before you can open stage " +
    stageNumber(index) +
    "."
  );
};

const stageNumber = (index) => index + 1;

const applyFlexStyles = () => {
  pitchField.style.display = "flex";
  pitchField.style.flexDirection = flexValues.flexDirection;
  pitchField.style.justifyContent = flexValues.justifyContent;
  pitchField.style.alignItems = flexValues.alignItems;
  pitchField.style.flexWrap = flexValues.flexWrap;
  applyCrowdPlayerSizes();
};

const getSingleRowPlayerSize = (playerCount) => {
  for (let size = 40; size >= 28; size -= 1) {
    const rowWidth = playerCount * size + (playerCount - 1) * CROWD_COL_GAP;
    if (rowWidth <= PITCH_FIELD_WIDTH && size <= PITCH_FIELD_HEIGHT) {
      return size;
    }
  }

  return 28;
};

const getMultiRowPlayerSize = (playerCount) => {
  for (let size = 48; size >= 36; size -= 1) {
    const perRow = Math.floor(
      (PITCH_FIELD_WIDTH + CROWD_COL_GAP) / (size + CROWD_COL_GAP)
    );
    if (perRow < 1) {
      continue;
    }

    const rows = Math.ceil(playerCount / perRow);
    const widestRowCount = Math.min(playerCount, perRow);
    const rowWidth =
      widestRowCount * size + (widestRowCount - 1) * CROWD_COL_GAP;
    const rowHeight = rows * size + (rows - 1) * CROWD_ROW_GAP;

    if (rows >= 2 && rowWidth <= PITCH_FIELD_WIDTH && rowHeight <= PITCH_FIELD_HEIGHT) {
      return size;
    }
  }

  return 40;
};

const applyPlayerSize = (element, size) => {
  element.style.width = size + "px";
  element.style.height = size + "px";
  element.style.fontSize = size < 36 ? "0.65rem" : "0.75rem";
};

const applyCrowdPlayerSizes = () => {
  const level = LEVELS[currentLevel];
  if (!level?.crowded) {
    return;
  }

  const playerCount = level.items.filter((item) => item.type === "player").length;
  const wraps = flexValues.flexWrap !== "nowrap";
  const size = wraps
    ? getMultiRowPlayerSize(playerCount)
    : getSingleRowPlayerSize(playerCount);

  pitchField.querySelectorAll(".player").forEach((element) => {
    applyPlayerSize(element, size);
  });
};

const updateControlButtons = () => {
  const buttons = document.querySelectorAll(".prop-btn");
  buttons.forEach((btn) => {
    const isActive = flexValues[btn.dataset.property] === btn.dataset.value;
    btn.classList.toggle("active", isActive);
  });
};

const clearFeedback = () => {
  feedback.textContent = "";
  feedback.className = "feedback";
  pitch.classList.remove("success-flash", "error-shake");
};

const resetLevelState = (level) => {
  flexValues = { ...(level.startValues || DEFAULT_VALUES) };
  attempts = 0;
  solved = false;
  revealed = false;
};

const applyCompletedState = (level) => {
  FLEX_PROPERTY_KEYS.forEach((key) => {
    flexValues[key] = level.solution[key];
  });
  solved = true;
  revealed = false;
};

const hideSolutionPanel = () => {
  solutionPanel.hidden = true;
  solutionList.innerHTML = "";
};

const showSolutionPanel = (solution) => {
  solutionList.innerHTML = "";

  FLEX_PROPERTY_KEYS.forEach((key) => {
    const item = document.createElement("li");
    const code = document.createElement("code");
    code.textContent = propertyToCss(key) + ": " + solution[key] + ";";
    item.appendChild(code);
    solutionList.appendChild(item);
  });

  solutionPanel.hidden = false;
};

const updateActionButtons = () => {
  discoverBtn.disabled = solved || revealed;
  checkBtn.disabled = solved || revealed;
};

const renderPlayers = (level) => {
  pitchField.innerHTML = "";
  pitchField.classList.toggle("pitch-field-crowded", Boolean(level.crowded));

  level.items.forEach((item) => {
    const element = document.createElement("div");

    if (item.type === "ball") {
      element.className = "ball";
      element.textContent = "⚽";
    } else {
      element.className = "player player-" + item.team;
      element.textContent = item.label;
    }

    pitchField.appendChild(element);
  });
};

const hideCelebration = () => {
  if (celebrationTimer) {
    clearTimeout(celebrationTimer);
    celebrationTimer = null;
  }
  celebration.hidden = true;
};

const playCelebration = () => {
  hideCelebration();
  celebration.hidden = false;

  const messi = celebration.querySelector(".legend-messi");
  const ronaldo = celebration.querySelector(".legend-ronaldo");
  const ball = celebration.querySelector(".celebration-ball");

  [messi, ronaldo, ball].forEach((element) => {
    if (!element) {
      return;
    }
    element.style.animation = "none";
    element.offsetHeight;
    element.style.animation = "";
  });

  celebrationTimer = setTimeout(hideCelebration, CELEBRATION_TIME);
};

const updateLevelNav = () => {
  const dots = levelDots.querySelectorAll(".level-dot");

  dots.forEach((dot, index) => {
    const reachable = canGoToLevel(index);
    dot.classList.toggle("active", index === currentLevel);
    dot.classList.toggle("done", hasBeatenLevel(index));
    dot.classList.toggle("locked", !reachable);
    dot.disabled = !reachable;
  });

  prevLevelBtn.disabled = currentLevel <= 0;
  nextLevelBtn.disabled = !canAdvanceToNextLevel();
  nextBtn.hidden = !solved || currentLevel >= LEVELS.length - 1;
};

const setProperty = (property, value) => {
  if (solved || revealed) {
    return;
  }

  flexValues[property] = value;
  applyFlexStyles();
  updateControlButtons();
  clearFeedback();
};

const loadLevel = (index, { replay = false } = {}) => {
  if (index < 0 || index >= LEVELS.length) {
    return;
  }

  if (!canGoToLevel(index)) {
    feedback.textContent = blockedLevelMessage(index);
    feedback.className = "feedback error";
    return;
  }

  hideCelebration();

  const level = LEVELS[index];
  const reviewing = !replay && hasBeatenLevel(index);
  currentLevel = index;
  maxReachedLevel = Math.max(maxReachedLevel, index);
  resetLevelState(level);

  if (reviewing) {
    applyCompletedState(level);
  }

  instruction.textContent = level.instruction;
  levelIndicator.textContent = "Level " + (index + 1) + " of " + LEVELS.length;
  attemptsCount.textContent = "0";

  renderPlayers(level);
  applyFlexStyles();
  updateControlButtons();
  updateLevelNav();
  updateActionButtons();
  hideSolutionPanel();
  clearFeedback();

  if (reviewing) {
    feedback.textContent =
      "You already beat this stage. Use Reset Level if you want to practise again.";
    feedback.className = "feedback success";
  }

  saveProgress();
};

const buildLevelDots = () => {
  levelDots.innerHTML = "";

  LEVELS.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "level-dot";
    button.textContent = String(index + 1);
    button.addEventListener("click", () => loadLevel(index));
    levelDots.appendChild(button);
  });
};

const buildControlButtons = () => {
  Object.keys(PROPERTY_OPTIONS).forEach((property) => {
    const container = document.getElementById("controls-" + property);
    if (!container) {
      return;
    }

    PROPERTY_OPTIONS[property].forEach((value) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "prop-btn";
      button.textContent = value;
      button.dataset.property = property;
      button.dataset.value = value;
      button.addEventListener("click", () => setProperty(property, value));
      container.appendChild(button);
    });
  });
};

const discoverResult = () => {
  if (solved || revealed) {
    return;
  }

  const solution = LEVELS[currentLevel].solution;

  FLEX_PROPERTY_KEYS.forEach((key) => {
    flexValues[key] = solution[key];
  });

  revealed = true;
  applyFlexStyles();
  updateControlButtons();
  showSolutionPanel(solution);
  updateActionButtons();

  feedback.textContent =
    "Result discovered! Study the layout, then reset the level to try alone.";
  feedback.className = "feedback reveal";
};

const checkSolution = () => {
  if (solved || revealed) {
    return;
  }

  const solution = LEVELS[currentLevel].solution;
  const correct = FLEX_PROPERTY_KEYS.every(
    (key) => flexValues[key] === solution[key]
  );

  attempts += 1;
  attemptsCount.textContent = String(attempts);

  if (correct) {
    solved = true;
    markCompleted(currentLevel);
    saveProgress();

    feedback.textContent = "Perfect formation! Messi and Ronaldo salute your tactics!";
    feedback.className = "feedback success";
    pitch.classList.add("success-flash");
    updateActionButtons();
    updateLevelNav();
    playCelebration();
    return;
  }

  feedback.textContent = "Not quite. Change the flex properties and try again.";
  feedback.className = "feedback error";
  pitch.classList.add("error-shake");
  setTimeout(() => pitch.classList.remove("error-shake"), 400);
};

const resetLevel = () => {
  loadLevel(currentLevel, { replay: true });
};

const goToNextLevel = () => {
  const nextIndex = currentLevel + 1;

  if (nextIndex >= LEVELS.length) {
    feedback.textContent = "You finished all levels! Replay any stage from the numbers above.";
    feedback.className = "feedback success";
    return;
  }

  if (!canGoToLevel(nextIndex)) {
    feedback.textContent = blockedLevelMessage(nextIndex);
    feedback.className = "feedback error";
    return;
  }

  loadLevel(nextIndex);
};

const nextLevel = () => {
  if (!solved) {
    feedback.textContent =
      "Press Check Formation and beat stage " +
      stageNumber(currentLevel) +
      " before moving to the next one.";
    feedback.className = "feedback error";
    return;
  }

  goToNextLevel();
};

const prevLevel = () => {
  const prevIndex = currentLevel - 1;

  if (prevIndex < 0) {
    return;
  }

  loadLevel(prevIndex);
};

checkBtn.addEventListener("click", checkSolution);
discoverBtn.addEventListener("click", discoverResult);
resetBtn.addEventListener("click", resetLevel);
nextBtn.addEventListener("click", nextLevel);
prevLevelBtn.addEventListener("click", prevLevel);
nextLevelBtn.addEventListener("click", goToNextLevel);

buildControlButtons();
buildLevelDots();
loadProgress();
loadLevel(currentLevel);
