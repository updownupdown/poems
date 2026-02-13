import { useEffect, useState } from "react";
import "./css/styles.scss";
import { cardsBaseGrey } from "./data/base_game_gray";
import { cardsBaseRed } from "./data/base_game_red";
import { cardsExpansionGrey } from "./data/more_cards_box_1_expansion_pack_gray";
import { cardsExpansionRed } from "./data/more_cards_box_1_expansion_pack_red";

type Card = {
  "1": string;
  "3": string;
};

function App() {
  const fullList = [
    ...cardsBaseGrey,
    ...cardsBaseRed,
    ...cardsExpansionGrey,
    ...cardsExpansionRed,
  ];

  const fullListLength = fullList.length;

  const [card, setCard] = useState<Card | undefined>(undefined);
  const [score, setScore] = useState(0);

  function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * fullListLength);
    setCard(fullList[randomIndex]);
  }

  function handleResult(type: "-1" | "1" | "3") {
    setScore((prev) => prev + Number(type));
    getRandomCard();
  }

  useEffect(() => {
    getRandomCard();
  }, []);

  return (
    <div className="main">
      <div className="main__score">
        <span>Score: {score}</span>
      </div>

      {card && (
        <div className="card">
          <span className="card__one">{card["1"]}</span>
          <br />
          <span className="card__three">{card["3"]}</span>
        </div>
      )}

      <div className="main__buttons">
        <button type="button" onClick={() => handleResult("-1")}>
          -1
        </button>
        <button type="button" onClick={() => handleResult("1")}>
          1
        </button>
        <button type="button" onClick={() => handleResult("3")}>
          3
        </button>
      </div>
    </div>
  );
}

export default App;
