import { For, createSignal } from "solid-js";

export const [multiplier, setMultiplier] = createSignal(10 as number);

export default function MyComponent() {
  function changeMultiplier(number: number) {
    setMultiplier(number);
  }

  const multipliers = [3, 6, 10];
  return (
    <>
      <div class="flex items-center gap-3">
        <p class="text-xl font-semibold">Multiplier</p>
        <div class="flex gap-1.5 p-1.5 bg-indigo-950 rounded-lg border-b-[1px] border-indigo-500 shadow-inner">
          <For each={multipliers}>
            {(number) => (
              <button
                class={`w-10 p-1.5 pt-1 pb-1.5 text-center rounded-md font-medium hover:bg-indigo-800 ${
                  number === multiplier()
                    ? "bg-indigo-700 shadow-sm border-t-[1px] border-indigo-500"
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
