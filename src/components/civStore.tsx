import { createSignal, createMemo, createRoot } from "solid-js";

// export default createSignal([]);
import data from "../data/civData.json";

interface SelectedCivs {
  name: string;
  myCiv: boolean;
}
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
  myCiv?: boolean;
}

const [selectedCivs, setSelectedCivs] = createSignal([] as SelectedCivs[]);

export const changeMyCiv = (myCivIndex: number) => {
  const arrayCopy = selectedCivs();
  console.log(arrayCopy);
  console.log('index', myCivIndex);
  
  arrayCopy.forEach(civ => civ.myCiv = false);
  arrayCopy[myCivIndex].myCiv = true;
  setSelectedCivs([...arrayCopy])
  console.log(selectedCivs());
  
}

function civDataStore() {

  const addCivString = (civName: string) => {
    const selectCivObj: SelectedCivs = {
      name: civName,
      myCiv: false,
    }
    if (selectedCivs().length === 0) {
      selectCivObj.myCiv = true
    }
    setSelectedCivs([...selectedCivs(), selectCivObj]);
  }

  const civsObj = createMemo(() => {
    const civsDataArray: Civilization[] = [];
    selectedCivs().forEach((civ) => {
      const getInfo = returnCivData(civ.name) as Civilization;
      getInfo.myCiv = false;

      if (civ.myCiv) {
        getInfo.myCiv = true;
      }
      if (getInfo) {
        civsDataArray.push(getInfo);
      }
    });
    console.log('civs array', civsDataArray);
    
    return civsDataArray;
  });
  return { selectedCivs, addCivString, civsObj };
}

export const civData = createRoot(civDataStore);

function returnCivData(civ: string) {
  return data.find((item) => item.civilization === civ);
}

