import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import AccountSettings from "./accountSettings";

function MainAccountSettings(props) {
  const { currentUser, lightMode, changeColorMode, setCurrentUser } = props;
  const [settingsModalVis, setSettingsVis] = useState(false);

  const toggleSettingsModal = () => setSettingsVis(!settingsModalVis);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") return;
    e.target.click();
  };

  return (
    <>
      <button
        onKeyDown={handleKeyDown}
        onClick={toggleSettingsModal}
        tabIndex="0"
        className="settings"
      >
        <BsThreeDots />
      </button>
      <AccountSettings
        modalVis={settingsModalVis}
        currentUser={currentUser}
        toggleVis={toggleSettingsModal}
        light={lightMode}
        changeColorMode={changeColorMode}
        setCurrentUser={setCurrentUser}
      />
    </>
  );
}

export default MainAccountSettings;
