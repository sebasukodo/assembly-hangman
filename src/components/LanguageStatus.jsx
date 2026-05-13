import { languages } from "../languages";

export default function LanguageStatus({ wrongGuessCount }) {
  const allLanguages = languages.map((x, index) => (
    <span
      id={x.name}
      key={x.name}
      className={index >= wrongGuessCount ? undefined : "lost"}
      style={{ backgroundColor: x.backgroundColor, color: x.color }}
    >
      {x.name}
    </span>
  ));

  return <section className="language-section">{allLanguages}</section>;
}
