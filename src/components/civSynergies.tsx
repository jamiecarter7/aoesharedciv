import { For, createMemo } from "solid-js";
import { civsData } from "./civStore";

export default function MyComponent() {
  const synergies = createMemo(() => {
    console.log(civsData());
    const civsSynergies: string[] = [];
    civsData().forEach((civ) => {
      if (civ.synergies) {
        civ.synergies.forEach((synergy) => {
          civsSynergies.push(synergy);
        });
      }
    });
    // remove single instances
    const duplicates = civsSynergies.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    const result = Object.entries(duplicates)
      .filter(([key, value]) => value > 1)
      .map(([key, value]) => ({ string: key, count: value }));

    console.log(result);
    return result;
  });

  return (
    <>
      <div class="flex w-full bg-indigo-900/60 p-2">
        <For each={synergies()}>
          {(synergy) => (
            <div class="bg-indigo-700 flex items-center text-sm">
              <div class="px-2.5 capitalize font-semibold">{synergy.string} {synergy.count.toString()}</div>
              
            </div>
          )}
        </For>
      </div>
    </>
  );
}
