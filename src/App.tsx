import { useEffect, useRef, useState } from "react";
import "./css/styles.scss";
import { cardsBaseGrey } from "./data/base_game_gray";
import { cardsBaseRed } from "./data/base_game_red";
import { cardsExpansionGrey } from "./data/more_cards_box_1_expansion_pack_gray";
import { cardsExpansionRed } from "./data/more_cards_box_1_expansion_pack_red";
import { useLocalStorage } from "./utils/hooks";
import { Header } from "./components/misc/Header";
import { popMovies } from "./data/pop_movies";
import { popShows } from "./data/pop_shows";
import { popSongs } from "./data/pop_songs";
import clsx from "clsx";

type Card = {
  "1": string;
  "3"?: string;
};

export type PlayState = {
  scoreTotal: number;
  timerLength: number;
};

const timerLengths = [15, 30, 45, 60, 120];

const defaultTimerLength = timerLengths[3];

const defaultPlayState = {
  scoreTotal: 0,
  timerLength: defaultTimerLength,
};

const lists = [
  {
    name: "Base Box: Grey",
    list: cardsBaseGrey,
  },
  {
    name: "Base Box: Red",
    list: cardsBaseRed,
  },
  {
    name: "Expansion Pack: Grey",
    list: cardsExpansionGrey,
  },
  {
    name: "Expansion Pack: Red",
    list: cardsExpansionRed,
  },
  {
    name: "All Base and Expansion",
    list: [
      ...cardsBaseGrey,
      ...cardsBaseRed,
      ...cardsExpansionGrey,
      ...cardsExpansionRed,
    ],
  },
  {
    name: "Movies",
    list: popMovies,
  },
  {
    name: "TV Shows",
    list: popShows,
  },
  {
    name: "Songs",
    list: popSongs,
  },
  {
    name: "All Pop (music, shows, songs)",
    list: [...popMovies, ...popShows, ...popSongs],
  },
];

function App() {
  const [playState, setPlayState] = useLocalStorage<PlayState>(
    "playState",
    defaultPlayState,
  );

  const [list, setList] = useState<any[]>([]);
  const [listName, setListName] = useState<string | undefined>(undefined);

  const [card, setCard] = useState<Card | undefined>(undefined);
  const [score, setScore] = useState(0);

  function getRandomCard() {
    if (list.length === 0) return;

    const randomIndex = Math.floor(Math.random() * list.length);
    setCard(list[randomIndex]);
  }

  function handleResult(type: "-1" | "1" | "3") {
    setScore((prev) => prev + Number(type));
    getRandomCard();
  }

  const [timer, setTimer] = useState<number | undefined>(undefined);
  const timerRef = useRef(timer);
  timerRef.current = timer;

  function startTimer() {
    setTimer(playState.timerLength);
  }

  useEffect(() => {
    if (list.length) {
      getRandomCard();
    } else {
      setPlayState((prev) => ({
        ...prev,
        scoreTotal: playState.scoreTotal + score,
      }));

      setScore(0);

      setTimer(undefined);
    }
  }, [list]);

  useEffect(() => {
    if (timer === 0) {
      setTimer(undefined);
    } else {
      setTimeout(() => {
        if (timerRef.current !== undefined) {
          setTimer(timerRef.current - 1);
        }
      }, 1000);
    }
  }, [timer]);

  return (
    <div className="main">
      <Header />

      <div className="main__score">
        <span>Total: {playState.scoreTotal}</span>

        {timer ? (
          <>
            <span>Score: {score}</span>
            <button
              type="button"
              onClick={() => {
                setList([]);
              }}
            >
              Stop
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              setPlayState((prev) => ({
                ...prev,
                scoreTotal: 0,
              }));
            }}
          >
            Reset score
          </button>
        )}
      </div>

      {timer && (
        <div className="main__timer">
          <span className="main__timer__text">{timer}</span>

          <div
            className={clsx(
              "main__timer__bar",
              timer / playState.timerLength < 0.5 && "main__timer__bar--yellow",
              timer / playState.timerLength < 0.6 && "main__timer__bar--orange",
              timer / playState.timerLength < 0.1 && "main__timer__bar--red",
            )}
            style={{ width: `${(timer / playState.timerLength) * 100}%` }}
          />
        </div>
      )}

      {timer !== undefined ? (
        card && (
          <div className="main__guessing">
            <div className="card">
              <span className="card__one">{card["1"]}</span>
              {card["3"] && <span className="card__three">{card["3"]}</span>}
            </div>

            <div className="main__guessing__buttons">
              <button
                type="button"
                className="red-btn btn--minus-one"
                onClick={() => handleResult("-1")}
              >
                -1
              </button>
              <button
                type="button"
                className="orange-btn btn--plus-one"
                onClick={() => handleResult("1")}
              >
                +1
              </button>
              {card["3"] && (
                <button
                  type="button"
                  className="green-btn btn--plus-three"
                  onClick={() => handleResult("3")}
                >
                  +3
                </button>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="main__options">
          <p>Timer (seconds)</p>

          <div className="main-options-list main-options-list--time">
            {timerLengths.map((t) => {
              return (
                <button
                  key={t}
                  onClick={() => {
                    setPlayState((prev) => ({ ...prev, timerLength: t }));
                  }}
                  disabled={playState.timerLength === t}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <p>Card Pack</p>

          <div className="main-options-list main-options-list--lists">
            {lists.map((l) => {
              return (
                <button
                  key={l.name}
                  type="button"
                  onClick={() => {
                    setList(l.list);
                    setListName(l.name);
                  }}
                  disabled={l.name === listName}
                >
                  {l.name}
                </button>
              );
            })}
          </div>

          <button
            className="accent-btn"
            onClick={() => {
              startTimer();
            }}
            disabled={listName === undefined}
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
