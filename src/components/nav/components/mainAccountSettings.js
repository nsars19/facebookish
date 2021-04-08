import { BsThreeDots } from "react-icons/bs";
import AccountSettings from "./accountSettings";

function MainAccountSettings(props) {
  const {
    toggleSettingsModal,
    settingsModalVis,
    currentUser,
    lightMode,
    changeColorMode,
    setCurrentUser,
  } = props;

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
