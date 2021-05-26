import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import AccountSettings from "./accountSettings";

function MainAccountSettings(props) {
  const { userName, pfp } = props;
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
        toggleVis={toggleSettingsModal}
        userName={userName}
        pfp={pfp}
      />
    </>
  );
}

export default MainAccountSettings;
