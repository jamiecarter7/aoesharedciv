import { For, Show, createMemo } from "solid-js";
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
    <Show when={synergies().length > 0}>
      <div class="flex gap-4 w-full p-2">
        <For each={synergies()}>
          {(synergy) => (
            <div class="bg-indigo-700 flex items-center text-sm rounded-md">
              <p class="relative p-1.5 px-2.5 bg-indigo-800">
                {synergy.count.toString()}
                <span class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-0.5 bg-indigo-800 rounded-full">x</span>
              </p>
              
              <p class="p-1.5 px-2.5 capitalize font-semibold">
                {synergy.string}
              </p>
            </div>
          )}
        </For>
      </div>
    </Show>
  );
}
