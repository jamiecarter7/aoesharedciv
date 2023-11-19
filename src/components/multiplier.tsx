import { For, createSignal } from "solid-js";
import { metaTitle } from "../pages/index.astro";
export const [multiplier, setMultiplier] = createSignal(10 as number);

export default function MyComponent() {
  function changeMultiplier(number: number) {
    setMultiplier(number);
    // document.title = metaTitle + `${number}x`;
  }

  const multipliers = [3, 6, 8, 9, 10];
  return (
    <>
      <div class="flex justify-end items-center h-12 gap-3">
        <p class="text-xl font-semibold">Multiplier</p>
        <div class="flex gap-1.5 p-1.5 bg-indigo-950 rounded-lg border-b-[1px] border-indigo-500 shadow-inner">
          <For each={multipliers}>
            {(number) => (
              <button
                class={`w-10 p-1.5 pt-1 pb-1.5 text-center rounded-md font-medium hover:bg-indigo-800 ${
                  number === multiplier()
                    ? "bg-gradient-to-b from-indigo-700 to-indigo-800 shadow-sm border-t-[1px] border-indigo-500 hover:from-indigo-500 hover:to-indigo-700"
                    : ""
                }`}
                onClick={[changeMultiplier, number]}
              >
                {number}x
              </button>
            )}
          </For>
        </div>
      </div>
    </>
  );
}
