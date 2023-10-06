import { createSignal, createMemo, createRoot } from "solid-js";

// export default createSignal([]);
import data from "../data/civData.json";

interface CivBonus {
  statement: string;
  base?: number;
  type: string;
  base1?: number;
}

export interface Civilization {
  civilization: string;
  type: string[];
  economy: CivBonus[];
  military: CivBonus[];
  synergies: string[];
}

function civDataStore() {
  const [selectedCivs, setSelectedCivs] = createSignal([] as string[]);

  const addCivString = (civ: string) => setSelectedCivs([...selectedCivs(), civ]);

  const civsObj = createMemo(() => {
    const civsDataArray: Civilization[] = [];
    selectedCivs().forEach((civ) => {
      const getInfo = returnCivData(civ);
      if (getInfo) {
        civsDataArray.push(getInfo);
      }
    });
    console.log(civsDataArray);
    
    return civsDataArray;
  });
  return { selectedCivs, addCivString, civsObj };
}

export const civData = createRoot(civDataStore);


function returnCivData(civ: string) {
  return data.find((item) => item.civilization === civ);
}

