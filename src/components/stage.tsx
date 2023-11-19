import { For, Show, createMemo } from "solid-js";
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
    <Show when={civsData().length > 0}>
      <div class="mt-8">
        <div class="flex items-center gap-4 mb-4 pl-2">
          <h2 class="flex-shrink-0 text-2xl font-semibold">Game phases</h2>
          <div class="w-full border-t-[1px] border-indigo-600/20"></div>
        </div>
        <div class="flex w-full gap-10 pt-4">
          <Stage stage="early" />
          <Stage stage="mid" />
          <Stage stage="late" />
        </div>
      </div>
    </Show>
  );
}

type StageProps = {
  stage: "early" | "mid" | "late";
};

export function Stage({ stage }: StageProps) {
  return (
    <div class="flex flex-col w-1/3">
      <div class="flex items-center gap-4 mb-4">
        <h2 class="flex-shrink-0 text-sm font-medium uppercase text-indigo-300 pl-2">
          {stage} game
        </h2>
        <div class="w-full border-t-[1px] border-indigo-600/20"></div>
      </div>
      <For each={civsStagesStatements()[stage]}>
        {(obj, i) => (
          <div class="inline-flex justify-between gap-3 group hover:bg-indigo-900 px-1 py-1 pl-2 rounded-lg">
            <p innerHTML={obj.statement}></p>
            <p class="flex items-center px-1 h-6 text-xs capitalize text-indigo-400 border-[1px] border-indigo-900 group-hover:bg-indigo-700 group-hover:border-indigo-700 group-hover:text-indigo-200 rounded-md">
              {obj.civ}
            </p>
          </div>
        )}
      </For>
    </div>
  );
}
