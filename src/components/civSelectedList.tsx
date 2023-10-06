import { For } from "solid-js";
import { selectedCivs } from "./civSelect";

export default function MyComponent() {
  return (
    <>
      <div class="flex w-full bg-indigo-900/60 p-2">
        <For each={selectedCivs()}>
          {(civ) => (
            <div class="bg-indigo-700 flex items-center text-sm">
              <div class="px-2.5 capitalize font-semibold">{civ}</div>
              <button class="blockflex items-center justify-center text-xs font-semibold bg-white/20 w-7 h-7">X</button>
            </div>
          )}
        </For>
      </div>
    </>
  );
}
