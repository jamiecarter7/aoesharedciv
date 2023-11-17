import { For, Show } from "solid-js";
import { selectedCivs, removeCivByName } from "./civStore";

export default function MyComponent() {
  return (
    <div class="bg-indigo-900/40 p-2 pb-2.5 border-t-2 border-t-indigo-950/20 shadow-md border-b-2 border-b-indigo-900/40">
      <Show when={selectedCivs().length > 0}
        fallback={
          <p class="flex items-center justify-center h-14 text-center text-sm text-indigo-400">Type anywhere to search and add your team civs</p>
        }
      >
        <div class=" max-w-4xl m-auto">
          <div class="grid grid-cols-4 gap-4 w-full ">
            <For each={selectedCivs()}>
              {(civ) => (
                <div
                  onclick={[removeCivByName, civ.name]}
                  class="relative p-1.5 pt-4 pb-2 bg-indigo-800/50 border-2 border-indigo-900 border-t-[1px] border-t-indigo-600 flex items-center text-sm rounded-lg overflow-hidden"
                >
                  <div class=" text-lg px-2.5 capitalize font-semibold">
                    {civ.name}
                  </div>
                  <button class="absolute top-1.5 right-1 blockflex items-center justify-center text-xs font-semibold bg-white/[10%] px-2 py-1.5 rounded-md">
                    Remove
                  </button>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
}
