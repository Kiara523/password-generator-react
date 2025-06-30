import { useState } from "react";
import PasswordDisplay from "./components/PasswordDisplay";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  /* const barContainerRef = useRef(null);
  const isDruggingRef = useRef(false);*/
  const [progress, setProgress] = useState(3);
  const [length, setLength] = useState(0);
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState(null);
  const [strength, setStrength] = useState({});
  const [options, setOptions] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  /* useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }); */

  /* const upDateProgressBar = (clientX) => {
    //get progress bar size and position relative to viewport
    const rect = barContainerRef.current.getBoundingClientRect();
    //calculate where the mouse is
    const x = Math.min(Math.max(clientX - rect.x, 0), rect.width);
    // turn it into porsentage
    const newProgress = (x / rect.width) * 100;
    // update the position in UI
    setProgress(newProgress);
    const charNum = Math.floor((newProgress * 20) / 100);
    setLength(charNum);
  };

  const handleThumbMouseDown = (e) => {
    isDruggingRef.current = true;
    upDateProgressBar(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDruggingRef.current) upDateProgressBar(e.clientX);
  };

  const handleMouseUp = () => {
    isDruggingRef.current = false;
  };

  const handleClickBar = (e) => {
    //horizontal coordinate within the application's viewport at which the event occurred
    upDateProgressBar(e.clientX);
  }; */

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setOptions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePasswordValidation = () => {
    //generate password
    if (!length) return;
    setPassword(generatePassord(options, length));
    // calculate entropy (ramdoness)
    const entropy = getEntropy(options, length);
    // check strength
    setStrength(calculateStrength(entropy));
  };

  const generatePassord = (options, length) => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>/?";
    let chars = "";
    if (options.lowercase) chars += lowercase;
    if (options.uppercase) chars += uppercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    return pwd;
  };

  const getEntropy = (options, length) => {
    let size = 0;
    if (options.lowercase) size += 26;
    if (options.uppercase) size += 26;
    if (options.numbers) size += 10;
    if (options.symbols) size += 32;

    if (size === 0) return;
    return Math.round(length * Math.log2(size));
  };

  const calculateStrength = (entropy) => {
    if (entropy < 40) return { description: "Too Weak!", color: "red" };
    if (entropy < 60) return { description: "Weak!", color: "orange" };
    if (entropy < 80) return { description: "Medium", color: "yellow" };
    return { description: "Strong", color: "green" };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <>
      <main>
        <section className="container">
          <h1 className="app__name">Password Generator</h1>
          <PasswordDisplay
            password={password}
            copyToClipboard={copyToClipboard}
            copied={copied}
            length={length}
            setLength={setLength}
          />

          <PasswordGenerator
            /* handleClickBar={handleClickBar}
            barContainerRef={barContainerRef}
            handleThumbMouseDown={handleThumbMouseDown} */
            handleCheckbox={handleCheckbox}
            handlePasswordValidation={handlePasswordValidation}
            options={options}
            progress={progress}
            setProgress={setProgress}
            length={length}
            setLength={setLength}
            strength={strength}
          />
        </section>
      </main>
    </>
  );
}

export default App;
