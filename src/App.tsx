import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CHORDS, CONSONANTS, RHYMES } from "./chords.const";
import { ConfusionMatrix } from "react-confusion-matrix";

function App() {
  const cObj = Object.fromEntries(
    CONSONANTS.map((c) => [
      c,
      new Set(
        CHORDS.filter((chord) => chord.includes(c)).map((chord) =>
          chord.replace(c, "")
        )
      ),
    ])
  );
  const cMatrix = CONSONANTS.map((a) =>
    CONSONANTS.map((b) => [...cObj[a]].filter((c) => cObj[b].has(c)).length)
  );
  const rObj = Object.fromEntries(
    RHYMES.map((r) => [
      r,
      new Set(
        CHORDS.filter((chord) => chord.includes(r)).map((chord) =>
          chord.replace(r, "")
        )
      ),
    ])
  );
  const rMatrix = RHYMES.map((a) =>
    RHYMES.map((b) => [...rObj[a]].filter((c) => rObj[b].has(c)).length)
  );

  return (
    <>
      <ConfusionMatrix data={cMatrix} labels={CONSONANTS} />
      <ConfusionMatrix data={rMatrix} labels={RHYMES} />
    </>
  );
}

export default App;
