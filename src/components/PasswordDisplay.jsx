const PasswordDisplay = ({ password, copyToClipboard, copied }) => {
  const style = {
    color: password === null ? "var(--grey-700)" : "var(--grey-200)",
  };
  let fontSize = "1.5rem";

  const getFontSize = (password) => {
    if (!password) return;
    if (password.length < 14) return "1.5rem";
    if (password.length < 17) return "1.3rem";
    return "1.1rem";
  };

  if (window.innerWidth < 800) {
    fontSize = getFontSize(password);
  }

  return (
    <div className="display__container" style={style}>
      <p className="pwd__display" style={{ fontSize: fontSize }}>
        {password || "P4$5W0rD!"}
      </p>
      <div className="copy-svg-container" onClick={copyToClipboard}>
        {copied && <p className="copied">copied</p>}
        <svg
          className="img__copy"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
      </div>
    </div>
  );
};

export default PasswordDisplay;
