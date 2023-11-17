export const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

export const UNITS = {
  tsp: 'tsp',
  tbsp: 'tbsp',
  cup: 'cup',
  oz: 'oz',
  lb: 'lb',
  ml: 'ml',
  l: 'l',
  g: 'g',
  kg: 'kg',
}

export const UNIT_TO_LABEL = {
  [UNITS.tsp]: 'Teaspoon',
  [UNITS.tbsp]: 'Tablespoon',
  [UNITS.cup]: 'Cup',
  [UNITS.oz]: 'Ounce',
  [UNITS.lb]: 'Pound',
  [UNITS.ml]: 'Milliliter',
  [UNITS.l]: 'Liter',
  [UNITS.g]: 'Gram',
  [UNITS.kg]: 'Kilogram',
}

export const UNIT_OPTIONS = [
  { value: UNITS.tsp, label: UNIT_TO_LABEL[UNITS.tsp] },
  { value: UNITS.tbsp, label: UNIT_TO_LABEL[UNITS.tbsp] },
  { value: UNITS.cup, label: UNIT_TO_LABEL[UNITS.cup] },
  { value: UNITS.oz, label: UNIT_TO_LABEL[UNITS.oz] },
  { value: UNITS.lb, label: UNIT_TO_LABEL[UNITS.lb] },
  { value: UNITS.ml, label: UNIT_TO_LABEL[UNITS.ml] },
  { value: UNITS.l, label: UNIT_TO_LABEL[UNITS.l] },
  { value: UNITS.g, label: UNIT_TO_LABEL[UNITS.g] },
  { value: UNITS.kg, label: UNIT_TO_LABEL[UNITS.kg] },
]

const TIMES = {
  '5-min': '5-min',
  '10-min': '10-min',
  '15-min': '15-min',
  '30-min': '30-min',
  '45-min': '45-min',
  '1-hr': '1-hr',
  '1-hr-30-min': '1-hr-30-min',
  '2-hr': '2-hr',
  '3-hr': '3-hr',
}

export const TIME_TO_LABEL = {
  [TIMES['5-min']]: '5 Minutes',
  [TIMES['10-min']]: '10 Minutes',
  [TIMES['15-min']]: '15 Minutes',
  [TIMES['30-min']]: '30 Minutes',
  [TIMES['45-min']]: '45 Minutes',
  [TIMES['1-hr']]: '1 Hour',
  [TIMES['1-hr-30-min']]: '1 Hour 30 Minutes',
  [TIMES['2-hr']]: '2 Hours',
  [TIMES['3-hr']]: '3 Hours',
}

export const TIME_OPTIONS = [
  { value: TIMES['5-min'], label: TIME_TO_LABEL[TIMES['5-min']] },
  { value: TIMES['10-min'], label: TIME_TO_LABEL[TIMES['10-min']] },
  { value: TIMES['15-min'], label: TIME_TO_LABEL[TIMES['15-min']] },
  { value: TIMES['30-min'], label: TIME_TO_LABEL[TIMES['30-min']] },
  { value: TIMES['45-min'], label: TIME_TO_LABEL[TIMES['45-min']] },
  { value: TIMES['1-hr'], label: TIME_TO_LABEL[TIMES['1-hr']] },
  { value: TIMES['1-hr-30-min'], label: TIME_TO_LABEL[TIMES['1-hr-30-min']] },
  { value: TIMES['2-hr'], label: TIME_TO_LABEL[TIMES['2-hr']] },
  { value: TIMES['3-hr'], label: TIME_TO_LABEL[TIMES['3-hr']] },
]
