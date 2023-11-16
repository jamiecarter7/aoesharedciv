import { For, createMemo } from "solid-js";
import { civsData, type CivBonus } from "./civStore";

type CivBonusWithCivName = CivBonus & { civ: string };

type civStagesStatements = {
  early: CivBonusWithCivName[];
  mid: CivBonusWithCivName[];
  late: CivBonusWithCivName[];
};
export const civsStagesStatements = createMemo<civStagesStatements>(() => {
  const stagesData: civStagesStatements = { early: [], mid: [], late: [] };

  civsData().forEach((civ) => {
    for (const economyBonus of civ.economy) {
      if (economyBonus.stage === "early") {
        const newBonus = { ...economyBonus, civ: civ.civilization };
        stagesData.early.push(newBonus);
        continue;
      }
      if (economyBonus.stage === "mid") {
        const newBonus = { ...economyBonus, civ: civ.civilization };
        stagesData.mid.push(newBonus);
        continue;
      }
      if (economyBonus.stage === "late") {
        const newBonus = { ...economyBonus, civ: civ.civilization };
        stagesData.late.push(newBonus);
        continue;
      }
      console.log(civ.civilization, economyBonus, " missing stage");
    }
    for (const militaryBonus of civ.military) {
      if (militaryBonus.stage === "early") {
        const newBonus = { ...militaryBonus, civ: civ.civilization };
        stagesData.early.push(newBonus);
        continue;
      }
      if (militaryBonus.stage === "mid") {
        const newBonus = { ...militaryBonus, civ: civ.civilization };
        stagesData.mid.push(newBonus);
        continue;
      }
      if (militaryBonus.stage === "late") {
        const newBonus = { ...militaryBonus, civ: civ.civilization };
        stagesData.late.push(newBonus);
        continue;
      }
      console.log(civ.civilization, militaryBonus, " missing stage");
    }
  });
  console.log("stages", stagesData);
  return stagesData;
});

export default function Stages() {
  return (
    <div class="mt-8">
      <h2 class="text-2xl font-semibold">Game phases</h2>
      <div class="flex w-full gap-3 pt-4">
        <Stage stage="early" />
        <Stage stage="mid" />
        <Stage stage="late" />
      </div>
    </div>
  );
}

type StageProps = {
  stage: "early" | "mid" | "late";
};

export function Stage({ stage }: StageProps) {
  return (
    <div class="flex flex-col gap-1.5 w-1/3">
      <h2 class="text-sm font-medium uppercase mb-3 text-indigo-300">{stage} game</h2>
      <For each={civsStagesStatements()[stage]}>
        {(obj, i) => (
          <div class="flex gap-3">
            <p innerHTML={obj.statement}></p>
            <p class="text-white/50">{obj.civ}</p>
          </div>
        )}
      </For>
    </div>
  );
}
