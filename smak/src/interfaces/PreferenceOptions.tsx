export interface PreferenceOption {
  label: string;
  options: [string, string];
}

const preferenceOptions: PreferenceOption[] = [
  { label: "Rökning", options: ["Rökare", "Icke-Rökare"] as const },
  { label: "Djur", options: ["Djurvänlig", "Inga Pälsdjur"] as const },
  { label: "Musik", options: ["Musik", "Utan Musik"] as const },
  { label: "Kultur", options: ["Pratglad", "Tyst"] as const },
];

export default preferenceOptions;
