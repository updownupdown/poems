// import { useState } from "react";
import "./Header.scss";
// import { MenuIcon } from "../icons/Menu";
// import type { PlayState } from "../../App";
// import { Modal } from "../Modal";

interface HeaderProps {
  // setPlayState: (playState: PlayState) => void;
}

export const Header = ({}: HeaderProps) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="header">
        <div className="header__title">Poems for Prats</div>

        {/* <div className="menu-wrap">
          <button
            className="menu-toggle-btn"
            type="button"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <MenuIcon />
          </button>
        </div> */}
      </div>

      {/* <Modal
        title="Menu"
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <div className="menu">
          <p>test</p>
          <p>test2</p>
        </div>
      </Modal> */}
    </>
  );
};
