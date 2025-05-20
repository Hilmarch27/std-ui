import React from 'react'
// todo styling this native HTML

export function InputSelect() {
  return (
    <div>
      <input list="lang" placeholder="select" />
      <datalist id="lang">
        <option value="java" />
        <option value="java script" />
        <option value="rust" />
      </datalist>
    </div>
  )
}

export function Popover() {
  return (
    <div>
      <button popoverTarget="popover" popoverTargetAction="show">
        popover
      </button>
      <div
        id="popover"
        popover="manual"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md rounded p-4 w-80"
      >
        <h2 className="text-lg font-semibold mb-2">popover</h2>
        <p className="mb-4">this is popover</p>
        <button popoverTarget="popover" popoverTargetAction="hide" className="px-4 py-2 bg-blue-500 text-white rounded">
          close
        </button>
      </div>
    </div>
  )
}

export function Accordion() {
  return (
    <details>
      <summary>Show more</summary>
      <p>Hidden content here</p>
    </details>
  )
}

export function Figure() {
  return (
    <figure>
      <img src="/static/tesla.webp" alt="Elephant at sunset" />
      <figcaption>An elephant at sunset</figcaption>
    </figure>
  )
}

export function DelIns() {
  return (
    <>
      <p>&ldquo;You're late!&rdquo;</p>
      <del>
        <p>&ldquo;I apologize for the delay.&rdquo;</p>
      </del>
      <ins>
        <p>&ldquo;A wizard is never late &hellip;&rdquo;</p>
      </ins>
    </>
  )
}

export function Data() {
  return (
    <>
      <p>New Products:</p>
      <ul>
        <li>
          <data value="398">Mini Ketchup</data>
        </li>
        <li>
          <data value="399">Jumbo Ketchup</data>
        </li>
        <li>
          <data value="400">Mega Jumbo Ketchup</data>
        </li>
      </ul>
    </>
  )
}

export function Ruby() {
  return (
    <ruby>
      漢 <rp>(</rp>
      <rt>kan</rt>
      <rp>)</rp> 字 <rp>(</rp>
      <rt>ji</rt>
      <rp>)</rp>
    </ruby>
  )
}

export function Progress() {
  return (
    <>
      <progress id="file" max="100" value="70">
        70%
      </progress>
      <meter id="fuel" min="0" max="100" low={33} high={66} optimum={80} value="50">
        at 50/100
      </meter>
    </>
  )
}

export function Fieldset() {
  return (
    <form>
      <fieldset className="border">
        <legend className="bg-white">Choose your favorite monster</legend>

        <input type="radio" id="kraken" name="monster" value="K" />
        <label>Kraken</label>
        <br />

        <input type="radio" id="sasquatch" name="monster" value="S" />
        <label>Sasquatch</label>
        <br />

        <input type="radio" id="mothman" name="monster" value="M" />
        <label>Mothman</label>
      </fieldset>
    </form>
  )
}
