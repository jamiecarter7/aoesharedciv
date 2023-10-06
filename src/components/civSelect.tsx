import { For, createSignal, createMemo, Show, createEffect } from "solid-js";
import data from "../data/civData.json";
import { civData } from "./civStore";

function searchRegex(inputText: string) {
  if (inputText.length > 0) {
    let regex = "";
    for (let s = 0; s < inputText.length; s++) {
      if (s === 0) {
        regex += inputText.charAt(s);
      } else {
        regex += `[^${inputText.charAt(s)}]*${inputText.charAt(s)}`;
      }
    }
    regex += ".*";
    return regex;
  }
  return "";
}

export const { selectedCivs, addCivString } = civData;

export default function MyComponent(props) {
  console.log(data);
  const [search, setSearch] = createSignal("");
  function clearSearch() {
    setSearch("");
  }

  const regex = createMemo(() => {
    console.log("Test");
    return new RegExp(searchRegex(search()), "gi");
  });

  const civsFiltered = createMemo(() => {
    return data.filter((item) => item.civilization.match(regex()));
  });

  const addCiv = (item) => {
    // Retrieve current value, push new item, and set the new array back to the signal
    addCivString(item);
    clearSearch();
  };

  createEffect(() => console.log("Search text:", search()));

  return (
    <>
      <div class="relative">
        {/* <label for="civ1" class="text-xs mt-4 mb-2">
          Add civilization
        </label> */}
        <div class={`flex items-center w-full overflow-hidden bg-indigo-950 rounded-lg font-xl font-medium border-b-[1px] border-indigo-500 shadow-inner duration-100 ease-in-out ${search().length > 0 ? 'rounded-b-none' : ''}`}>
          <input
            class="block outline-none w-full p-2 px-5 bg-indigo-950 placeholder:text-indigo-400 placeholder:text-opacity-80 text-xl"
            id="civ1"
            type="text"
            placeholder="Add civilization"
            value={search()}
            onInput={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Escape") {
                clearSearch("");
              }
              if (e.code === "Enter") {
                addCiv(civsFiltered()[0].civilization);
              }
            }}
          />
          <p class="block p-0.5 px-1 rounded-md bg-indigo-900 border-[1px] border-indigo-700 text-xs">
            Esc
          </p>
          <button class="m-2 p-1.5 px-2.5 uppercase rounded-md font-semibold text-sm bg-gradient-to-b from-indigo-700 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 shadow-sm border-t-[1px] border-indigo-500 " >
            clear
          </button>
          {/* <button class="p-3 px-5 uppercase bg-indigo-600 rounded-md shadow-md">
            add
          </button> */}
        </div>
        <div class="absolute top-full w-full shadow-lg">
          <Show when={search().length > 0} fallback="">
            <For each={civsFiltered().slice(0, 8)}>
              {(civs, i) => (
                <button class="flex justify-between items-center p-3 px-5 pr-3 w-full bg-indigo-700 border-b-[1px] border-indigo-500 border-opacity-75 last-of-type:rounded-b-md">
                  <div class="capitalize">{civs.civilization}</div>
                  <div class="flex items-center gap-2">
                    <Show when={i() < 10} fallback="">
                      <Show
                        when={i() > 0}
                        fallback={
                          <p class="p-0.5 px-1 rounded-md bg-indigo-700 border-[1px] border-indigo-500 text-xs">
                            Enter
                          </p>
                        }
                      >
                        <p class="block w-6 p-0.5 px-1 rounded-md bg-indigo-800/40 shadow-inner border-[1px] border-indigo-600 text-xs">
                          {i}
                        </p>
                      </Show>
                    </Show>
                    <p class="p-1.5 px-2 bg-indigo-600 rounded-md shadow text-xs ">
                      Add civ
                    </p>
                  </div>
                </button>
              )}
            </For>
          </Show>
        </div>
      </div>
    </>
  );
}
