import { words } from "./words";

function getRandomNumber(length: number): number {
  return Math.floor(Math.random() * length);
}

export function getRandomWord(): string {
  const randomIndex = getRandomNumber(words.length);
  return words[randomIndex];
}

export function getFarewellText(language: string): string {
  const options = [
    `Farewell, ${language}`,
    `Adios, ${language}`,
    `R.I.P., ${language}`,
    `We'll miss you, ${language}`,
    `Oh no, not ${language}!`,
    `${language} bites the dust`,
    `Gone but not forgotten, ${language}`,
    `The end of ${language} as we know it`,
    `Off into the sunset, ${language}`,
    `${language}, it's been real`,
    `${language}, your watch has ended`,
    `${language} has left the building`,
    `${language} failed to compile`,
    `${language} encountered a fatal error`,
    `${language} segfaulted`,
    `${language} was deprecated`,
    `${language} forgot a semicolon`,
    `${language} couldn’t handle the pressure`,
    `${language} ran into undefined behavior`,
    `${language} has entered maintenance mode`,
    `${language} rage quit the stack`,
    `${language} got garbage collected`,
    `${language} is now legacy code`,
    `${language} committed its last commit`,
    `${language} pushed straight to production`,
    `${language} took an arrow to the kernel`,
    `${language} has been sacrificed to Assembly`,
  ];

  const randomIndex = getRandomNumber(options.length);
  return options[randomIndex];
}
