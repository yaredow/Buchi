export type DogBreed = {
  id: number;
  breedName: string;
  breedShortDescription: string;
  breedLongDescription: string;
  breedCharacteristics: string[];
  breedImages: string[];
  averageHeight?: number; // Average height in centimeters
  averageWeight?: number; // Average weight in kilograms
  lifeExpectancy?: number; // Life expectancy in years
  temperament?: string; // Description of temperament
  hairShedding?: string; // Hair shedding information
  activity?: string; // Activity level description
  sociability?: string; // Sociability description
  intelligence?: string; // Intelligence level description
  childFriendly?: string; // Child-friendliness description
  careLevel?: string; // Care level description
  healthProblems?: string; // Common health problems description
  geneticProfile?: string; // Genetic profile description
  feedingHabits?: string; // Feeding habits description
};
