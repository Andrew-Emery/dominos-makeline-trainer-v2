export interface CodeItem {
  code: string;
  name: string;
  glutenContaining?: true;
}

export interface PortionItem {
  pizza: string;
  slices: number;
}

// Define a type for valid ingredient codes
export type IngredientCode = (typeof trainingData)['ingredient-codes'][number]['code'];

export interface PreBuiltItem {
  name: string;
  code: string;
  toppings: string[];
  notes?: string;
}

export interface TrainingData {
  'crust-codes': CodeItem[];
  'portion-codes': CodeItem[];
  'ingredient-codes': CodeItem[];
  'meat-portions': PortionItem[];
  'pre-built': PreBuiltItem[];
}

// Helper function to convert ingredient codes to readable names
export const getIngredientName = (code: IngredientCode): string => {
  const ingredient = trainingData['ingredient-codes'].find((item) => item.code === code);
  return ingredient?.name || code;
};

// Helper to parse a topping string into portion and ingredient code
export const parseTopping = (topping: string): { portion?: string; code: IngredientCode } => {
  const portionCodes = ['-', '~', '+', '2'];
  if (topping.length > 1 && portionCodes.includes(topping[0])) {
    return { portion: topping[0], code: topping.slice(1) as IngredientCode };
  }
  return { code: topping as IngredientCode };
};

export const trainingData: TrainingData = {
  'crust-codes': [
    { code: 'CC', name: 'Classic Crust (Available in all sizes)' },
    { code: 'SC', name: 'Stuffed Crust (Medium & Large)' },
    { code: 'XT', name: 'Italian Style Crust (Small, Medium & Large)' },
    { code: 'TC', name: 'Thin Crust (Medium & Large)' },
    { code: 'DD', name: 'Double Decadance (Medium & Large)' },
    { code: 'VG-CC', name: 'Vegan Classic Crust (Medium)' },
    { code: 'VG-XT', name: 'Vegan Italian Style Crust (Large)' },
    { code: 'G3', name: 'Gluten Free Crust (Small)' },
  ],
  'portion-codes': [
    { code: '-', name: "Minus Topping (Don't put the topping on the pizza)" },
    { code: '~', name: 'Less Topping (Put less of the topping on the pizza)' },
    { code: '+', name: 'Extra Topping (Put a little bit more of the topping on the pizza)' },
    { code: '2', name: 'Double Topping (Put double of the topping on the pizza)' },
  ],
  'ingredient-codes': [
    // Sauces
    { code: 'X', name: 'Tomato Sauce' },
    { code: 'Qs', name: 'BBQ Sauce' },
    // Cheeses
    { code: 'C', name: 'Cheese' },
    { code: 'Cd', name: 'Delight Cheese' },
    { code: 'Ca', name: 'Vegan Cheese' },
    // Toppings
    { code: 'P', name: 'Pepperoni' },
    { code: 'H', name: 'Ham' },
    { code: 'S', name: 'Sausage', glutenContaining: true },
    { code: 'Mb', name: 'Meatballs', glutenContaining: true },
    { code: 'R', name: 'Chorizo' },
    { code: 'K', name: 'Bacon' },
    { code: 'Hd', name: 'Sliced Hotdogs' },
    { code: 'Gk', name: 'Gherkins' },
    { code: 'Vp', name: 'Vegan Pepperonay', glutenContaining: true },
    { code: 'B', name: 'Beef', glutenContaining: true },
    { code: 'W', name: 'Roast Chicken' },
    { code: 'D', name: 'Tandoori Chicken' },
    { code: 'F', name: 'Fresh Tomatoes' },
    { code: 'J', name: 'Jalapenos' },
    { code: 'N', name: 'Sweetcorn' },
    { code: 'I', name: 'Pineapple' },
    { code: 'G', name: 'Green and Red Peppers' },
    { code: 'O', name: 'Onions' },
    { code: 'M', name: 'Mushrooms' },
    { code: 'V', name: 'Black Olives' },
    { code: 'T', name: 'Tuna' },
    { code: '*', name: 'Herbs' },
    { code: 'Xs', name: 'Pizza Sauce Drizzle' },
  ],
  'meat-portions': [
    { pizza: 'Personal 7 Inch', slices: 4 },
    { pizza: 'Small 9 Inch', slices: 6 },
    { pizza: 'Medium 11 Inch', slices: 8 },
    { pizza: 'Large 13 Inch', slices: 10 },
  ],
  'pre-built': [
    // BBQ Bases
    {
      name: 'Texas BBQ',
      code: 'BQ',
      toppings: ['Qs', 'K', 'W', 'O', 'G'],
    },
    {
      name: 'Meteor',
      code: 'MT',
      toppings: ['Qs', 'P', 'S', 'Mb', 'K', 'B'],
    },
    {
      name: 'Ranch BBQ',
      code: 'RQ',
      toppings: ['Qs', 'P', 'K', 'B', 'W'],
      notes: 'Two pepperoni per slice, one on personal',
    },
    // Tomato Bases
    {
      name: 'Cheese & Tomato',
      code: 'MA',
      toppings: ['+C'],
    },
    {
      name: 'Pepperoni Passion',
      code: 'PP',
      toppings: ['2C', '2P'],
      notes: 'Four pepperoni per slice, three on personal',
    },
    {
      name: 'American Hot',
      code: 'AH',
      toppings: ['P', 'O', 'J'],
      notes: 'Three pepperoni per slice, two on personal',
    },
    {
      name: 'Mighty Meaty',
      code: 'MM',
      toppings: ['P', 'H', 'S', 'B', 'O', 'M'],
      notes: 'Two pepperoni, two ham per slice, one of each on personal',
    },
    {
      name: 'New Yorker',
      code: 'NY',
      toppings: ['P', 'H', 'K', 'M'],
      notes: 'Two pepperoni, two ham per slice, one of each on personal',
    },
    {
      name: 'Meatfielder',
      code: 'MD',
      toppings: ['P', 'H', 'Mb', 'R', 'K'],
      notes:
        'One pepperoni, one ham, one meatball, one bacon, two chorizo per slice,one of each on personal',
    },
    {
      name: 'Absolute Banger',
      code: 'AB',
      toppings: ['P', 'S', 'R', 'Hd'],
      notes:
        'One pepperoni, one sausage, one chorizo and four hotdogs per slice, two hotdogs on personal',
    },
    {
      name: 'Ham & Pineapple',
      code: 'HI',
      toppings: ['H', 'I'],
      notes: 'Three ham per slice, two on personal',
    },
    {
      name: 'Meatball Marinara',
      code: 'MB',
      toppings: ['2Mb', 'O', 'Xs', '*'],
      notes: 'Three meatballs per slice, two on personal',
    },
    {
      name: 'Cheeseburger',
      code: 'BU',
      toppings: ['2B', 'O', 'Gk', 'F'],
      notes: 'Burger sauce, post bake',
    },
    {
      name: 'Chicken Feast',
      code: 'CF',
      toppings: ['W', 'M', 'N'],
    },
    {
      name: 'Tandoori Hot',
      code: 'TH',
      toppings: ['D', 'O', 'G', 'M', 'J'],
    },
    {
      name: 'Hot & Spicy',
      code: 'HS',
      toppings: ['B', 'O', 'G', 'J'],
    },
    {
      name: 'Tuna Supreme',
      code: 'TD',
      toppings: ['T', 'O', 'N'],
    },
    {
      name: 'Vegi Supreme',
      code: 'VS',
      toppings: ['O', 'G', 'M', 'N', 'F'],
    },
    {
      name: 'Vegi Volcano',
      code: 'VV',
      toppings: ['2C', 'O', 'G', 'J', 'F'],
    },
    {
      name: 'Vegan Vegi Supreme',
      code: 'VVS',
      toppings: ['Ca', 'O', 'G', 'M', 'N', 'F'],
    },
    {
      name: 'Vegan Pepperonay',
      code: 'VPN',
      toppings: ['Ca', 'Vp'],
    },
    {
      name: 'Vegan Margherita',
      code: 'VMA',
      toppings: ['Ca', 'F', '*'],
    },
    {
      name: 'Vegan American Hot',
      code: 'VAH',
      toppings: ['Ca', 'Vp', 'O', 'J'],
    },
  ],
};
