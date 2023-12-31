export const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

export const ABBREVIATION_TO_UNIT = {
  t: 'Teaspoon',
  tsp: 'Teaspoon',
  T: 'Tablespoon',
  TB: 'Tablespoon',
  Tbl: 'Tablespoon',
  Tbsp: 'Tablespoon',
  tbsp: 'Tablespoon',
  C: 'Cup',
  c: 'Cup',
  oz: 'Ounce',
  lb: 'Pound',
  mL: 'Milliliter',
  ml: 'Milliliter',
  L: 'Liter',
  l: 'Liter',
  g: 'Gram',
  kg: 'Kilogram',
  pt: 'Pint',
  pkg: 'Package',
  qt: 'Quart',
}

export const UNITS = [
  'Teaspoon',
  'Tablespoon',
  'Cup',
  'Ounce',
  'Pound',
  'Milliliter',
  'Liter',
  'Gram',
  'Kilogram',
  'Pint',
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
