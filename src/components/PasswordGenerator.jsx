import ProgressBar from "./ProgressBar";

const PasswordGenerator = ({
  handleClickBar,
  barContainerRef,
  handleThumbMouseDown,
  handleCheckbox,
  handlePasswordValidation,
  options,
  progress,
  setProgress,
  length,
  setLength,
  strength,
}) => {
  return (
    <div className="pwd__generator">
      <div className="length__section">
        <p className="length__section--title">Character Length</p>
        <span className="length__section--num">{length}</span>
      </div>
      <ProgressBar
        handleClickBar={handleClickBar}
        barContainerRef={barContainerRef}
        handleThumbMouseDown={handleThumbMouseDown}
        setProgress={setProgress}
        length={length}
        setLength={setLength}
        progress={progress}
      />
      {/* <div
        className="progressive-bar__container"
        ref={barContainerRef}
        onClick={handleClickBar}
      >
        <div
          className="progressive-bar"
          style={{ width: `${progress}%` }}
        ></div>
        <div
          className="progressive-bar__thumb"
          onMouseDown={handleThumbMouseDown}
          style={{
            position: "absolute",
            left: `calc(${progress}% - 15px)`,
            top: "-25%",
          }}
        ></div>
      </div> */}
      <ul className="options-list">
        <li className="list-item">
          <input
            className="checkbox uppercase"
            name="uppercase"
            value="uppercase"
            type="checkbox"
            id="uppercase"
            checked={options.uppercase}
            onChange={handleCheckbox}
          />
          <label htmlFor="uppercase">Include Uppercase Letters</label>
        </li>
        <li className="list-item">
          <input
            className="checkbox lowercase"
            name="lowercase"
            value="lowercase"
            type="checkbox"
            id="lowercase"
            checked={options.lowercase}
            onChange={handleCheckbox}
          />
          <label htmlFor="lowercase">Include Lowercase Letters</label>
        </li>
        <li className="list-item">
          <input
            className="checkbox numbers"
            name="numbers"
            value="numbers"
            type="checkbox"
            id="numbers"
            checked={options.numbers}
            onChange={handleCheckbox}
          />
          <label htmlFor="numbers">Include Numbers</label>
        </li>
        <li className="list-item">
          <input
            className="checkbox symbol"
            name="symbols"
            value="symbols"
            type="checkbox"
            id="symbol"
            checked={options.symbols}
            onChange={handleCheckbox}
          />
          <label htmlFor="symbol">Include Symbols</label>
        </li>
      </ul>
      <div className="strength__section">
        <p className="strength__section--title">strength </p>
        <div className="square__container">
          <p className="strength">{strength.description}</p>
          <p
            className="square__container--square"
            style={{
              borderColor: `var(--${strength.color})`,
              backgroundColor: `var(--${strength.color})`,
            }}
          ></p>
          <p
            className="square__container--square"
            style={{
              borderColor:
                strength.color !== "red"
                  ? `var(--${strength.color})`
                  : "var(--grey-200)",
              backgroundColor:
                strength.color !== "red"
                  ? `var(--${strength.color})`
                  : "transparent",
            }}
          ></p>
          <p
            className="square__container--square"
            style={{
              borderColor:
                strength.color === "yellow" || strength.color === "green"
                  ? `var(--${strength.color})`
                  : "var(--grey-200)",
              backgroundColor:
                strength.color === "yellow" || strength.color === "green"
                  ? `var(--${strength.color})`
                  : "transparent",
            }}
          ></p>
          <p
            className="square__container--square"
            style={{
              borderColor:
                strength.color === "green"
                  ? `var(--${strength.color})`
                  : "var(--grey-200)",
              backgroundColor:
                strength.color === "green"
                  ? `var(--${strength.color})`
                  : "transparent",
            }}
          ></p>
        </div>
      </div>
      <div className="button__container">
        <button className="button" onClick={handlePasswordValidation}>
          generate
          <svg
            className="arrow-svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
