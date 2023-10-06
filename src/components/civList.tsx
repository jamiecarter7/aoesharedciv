import { For, createMemo } from "solid-js";

import { civData, changeMyCiv, type Civilization } from "./civStore";
import { multiplier } from "./multiplier"

export default function MyComponent() {
  const { civsObj } = civData;
  console.log("thingy", civsObj());

  const renderedStatement = (
    statement: string,
    multiplier: number,
    base?: number,
    base1?: number
  ) => {
    let str = statement;
    if (typeof base === 'number') {
      const dynamicNumber = base * multiplier;
      const div = '<span class="text-green-400">' + dynamicNumber + "</span>";
      str = str.replaceAll("{{BASE}}", div);
    }
    if (typeof base1 === 'number') {
      const dynamicNumber1 = base1 * multiplier;
      const div1 = '<span class="text-green-400">' + dynamicNumber1 + "</span>";
      str = str.replaceAll("{{BASE1}}", div1);
    }
    console.log(str);

    return str;
  };

  const civilizationDetail = (civObj: Civilization) => {
    return (
      <div>
        <h2 class="capitalize text-3xl mb-4">{civObj.civilization}</h2>
        <h3 class="text-xs uppercase mt-8 mb-4 font-bold">Economy</h3>
        <ul class="">
          <For each={civObj.economy}>
            {(item, i) => (
              <li
                class="my-2"
                innerHTML={renderedStatement(
                  item.statement,
                  multiplier(),
                  item.base,
                  item.base1
                )}
              ></li>
            )}
          </For>
        </ul>

        <h3 class="text-xs uppercase mt-8 mb-4 font-bold">Military</h3>
        <ul>
          <For each={civObj.military}>
            {(item, i) => (
              <li
                class="my-2"
                innerHTML={renderedStatement(
                  item.statement,
                  multiplier(),
                  item.base,
                  item.base1
                )}
              ></li>
            )}
          </For>
        </ul>
      </div>
    );
  };

  return (
    <>
      <div class="flex gap-8">
        <For each={civsObj()}>
          {(civ, index) => (
            <div
              class={`relative w-full p-8 rounded-xl  ${
                civ.myCiv ? "border-2 border-purple-800 shadow-lg" : ""
              }`}
              onClick={[changeMyCiv, index()]}
            >
              {civ.myCiv ? (
                <h2 class="absolute right-8 bg-purple-800 p-2.5 py-1 rounded-full text-sm uppercase font-semibold">
                  My civilization
                </h2>
              ) : undefined}
              <div>{civilizationDetail(civ)}</div>
            </div>
          )}
        </For>
      </div>
    </>
  );
}
