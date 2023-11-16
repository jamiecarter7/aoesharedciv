import { createSignal, createMemo, createRoot } from "solid-js";
import { multiplier } from "./multiplier";
// export default createSignal([]);
import data from "../data/civData.json";

interface SelectedCivs {
  name: string;
  myCiv: boolean;
}

type Stages = "early" | "mid" | "late";

export type CivBonus = {
  statement: string;
  type: string;
  base?: number;
  base1?: number;
  base2?: number;
  base3?: number;
  base4?: number;
  base5?: number;
  stage?: Stages;
}

export interface Civilization {
  civilization: string;
  type: string[];
  economy: CivBonus[];
  military: CivBonus[];
  synergies: string[];
  myCiv?: boolean;
}

export const [selectedCivs, setSelectedCivs] = createSignal<SelectedCivs[]>([]);

export const changeMyCiv = (myCivIndex: number) => {
  const arrayCopy = selectedCivs();
  console.log(arrayCopy);
  console.log("index", myCivIndex);

  arrayCopy.forEach((civ) => (civ.myCiv = false));
  arrayCopy[myCivIndex].myCiv = true;
  setSelectedCivs([...arrayCopy]);
  console.log(selectedCivs());
};

export const addCivString = (civName: string) => {
  const selectCivObj: SelectedCivs = {
    name: civName,
    myCiv: false,
  };
  if (selectedCivs().length === 0) {
    selectCivObj.myCiv = true;
  }
  setSelectedCivs([...selectedCivs(), selectCivObj]);
};

export const civsData = createMemo(() => {
  console.log(multiplier(), "multipler");
  
  const civsDataArray: Civilization[] = [];
  let myCivSelected = false;
  selectedCivs().forEach((civ) => {
    const getInfo = returnCivData(civ.name) as Civilization;
    getInfo.myCiv = false;

    if (civ.myCiv && !myCivSelected) {
      getInfo.myCiv = true;
    }
    const economyBonusWithMutiplier = [];
    for (const economyBonus of getInfo.economy) {
      const statement = renderedStatementString(economyBonus, multiplier());
      economyBonusWithMutiplier.push(statement);
    }
    const militaryBonusWithMutiplier = [];
    for (const militaryBonus of getInfo.military) {
      const statement = renderedStatementString(militaryBonus, multiplier());
      militaryBonusWithMutiplier.push(statement);
    }
    getInfo.economy = economyBonusWithMutiplier;
    getInfo.military = militaryBonusWithMutiplier;
    if (getInfo) {
      civsDataArray.push(getInfo);
    }
  });
  console.log("civsObj", civsDataArray);

  return civsDataArray;
});

// export const civData = createRoot(civDataStore);

function returnCivData(civ: string) {
  return data.find((item) => item.civilization === civ);
}

function renderedStatementString(civBonus: CivBonus, multiplier: number) {
  let str = civBonus.statement;
  if (typeof civBonus.base === 'number') {
    const dynamicNumber = civBonus.base * multiplier;
    const div = '<span class="text-green-400">' + dynamicNumber + "</span>";
    str = str.replaceAll("{{BASE}}", div);
  }
  if (civBonus.base1) {
    const dynamicNumber1 = civBonus.base1 * multiplier;
    const div1 = '<span class="text-green-400">' + dynamicNumber1 + "</span>";
    str = str.replaceAll("{{BASE1}}", div1);
  }
  if (civBonus.base2) {
    const dynamicNumber1 = civBonus.base2 * multiplier;
    const div1 = '<span class="text-green-400">' + dynamicNumber1 + "</span>";
    str = str.replaceAll("{{BASE2}}", div1);
  }
  if (civBonus.base3) {
    const dynamicNumber1 = civBonus.base3 * multiplier;
    const div1 = '<span class="text-green-400">' + dynamicNumber1 + "</span>";
    str = str.replaceAll("{{BASE3}}", div1);
  }
  if (civBonus.base4) {
    const dynamicNumber1 = civBonus.base4 * multiplier;
    const div1 = '<span class="text-green-400">' + dynamicNumber1 + "</span>";
    str = str.replaceAll("{{BASE4}}", div1);
  }
  if (civBonus.base5) {
    const dynamicNumber1 = civBonus.base5 * multiplier;
    const div1 = '<span class="text-green-400">' + dynamicNumber1 + "</span>";
    str = str.replaceAll("{{BASE5}}", div1);
  }
  console.log(str);
  civBonus.statement = str;
  return civBonus;
};