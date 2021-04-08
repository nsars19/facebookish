import { BsThreeDots } from "react-icons/bs";
import AccountSettings from "./accountSettings";

function MainAccountSettings(props) {
  const {
    handleKeyDown,
    toggleSettingsModal,
    settingsModalVis,
    currentUser,
    lightMode,
    changeColorMode,
    setCurrentUser,
  } = props;

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
