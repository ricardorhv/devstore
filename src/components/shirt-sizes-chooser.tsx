'use client'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useState } from 'react'

type ShirtSizesType = 'P' | 'M' | 'G' | 'GG'

interface ShirtSizesChooserProps {
  preChosenShirtSize?: ShirtSizesType
}

export function ShirtSizesChooser({
  preChosenShirtSize,
}: ShirtSizesChooserProps) {
  const [shirtSize, setShirtSize] = useState<ShirtSizesType | ''>(
    preChosenShirtSize || '',
  )
  const isAnyRadioButtonChecked = shirtSize.length !== 0
  const styleToLowOpacity =
    'has-[button[data-is-any-radio-checked=true]]:opacity-40'

  function handleChangeShirtSize(newShirtSize: ShirtSizesType) {
    setShirtSize(newShirtSize)
  }

  function formatRadioButtonId(size: ShirtSizesType) {
    const locationRenderedComponent = preChosenShirtSize
      ? 'cartShirtSize'
      : 'shirtSize'

    return `${locationRenderedComponent}${size}`
  }

  return (
    <>
      <span className="block font-semibold">Tamanhos</span>

      <RadioGroup.Root
        className="flex gap-2"
        onValueChange={handleChangeShirtSize}
        defaultValue={shirtSize}
      >
        <div
          className={`h-9 w-14 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800 text-sm font-semibold group has-[button[data-state=checked]]:bg-violet-700 has-[button[data-state=checked]]:border-violet-700 hover:bg-zinc-900 ${
            shirtSize !== 'P' ? styleToLowOpacity : ''
          }`}
        >
          <RadioGroup.Item
            className="hidden"
            value="P"
            id={formatRadioButtonId('P')}
            data-is-any-radio-checked={isAnyRadioButtonChecked}
          />
          <label
            className="w-full h-full text-center flex items-center justify-center cursor-pointer transition-colors"
            htmlFor={formatRadioButtonId('P')}
          >
            P
          </label>
        </div>
        <div
          className={`h-9 w-14 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800 text-sm font-semibold group has-[button[data-state=checked]]:bg-violet-700 has-[button[data-state=checked]]:border-violet-700 hover:bg-zinc-900 ${
            shirtSize !== 'M' ? styleToLowOpacity : ''
          }`}
        >
          <RadioGroup.Item
            className="hidden"
            value="M"
            id={formatRadioButtonId('M')}
            data-is-any-radio-checked={isAnyRadioButtonChecked}
          />
          <label
            className="w-full h-full text-center flex items-center justify-center cursor-pointer transition-colors"
            htmlFor={formatRadioButtonId('M')}
          >
            M
          </label>
        </div>
        <div
          className={`h-9 w-14 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800 text-sm font-semibold group has-[button[data-state=checked]]:bg-violet-700 has-[button[data-state=checked]]:border-violet-700 hover:bg-zinc-900 ${
            shirtSize !== 'G' ? styleToLowOpacity : ''
          }`}
        >
          <RadioGroup.Item
            className="hidden"
            value="G"
            id={formatRadioButtonId('G')}
            data-is-any-radio-checked={isAnyRadioButtonChecked}
          />
          <label
            className="w-full h-full text-center flex items-center justify-center cursor-pointer transition-colors"
            htmlFor={formatRadioButtonId('G')}
          >
            G
          </label>
        </div>
        <div
          className={`h-9 w-14 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800 text-sm font-semibold group has-[button[data-state=checked]]:bg-violet-700 has-[button[data-state=checked]]:border-violet-700 hover:bg-zinc-900 ${
            shirtSize !== 'GG' ? styleToLowOpacity : ''
          }`}
        >
          <RadioGroup.Item
            className="hidden"
            value="GG"
            id={formatRadioButtonId('GG')}
            data-is-any-radio-checked={isAnyRadioButtonChecked}
          />
          <label
            className="w-full h-full text-center flex items-center justify-center cursor-pointer transition-colors"
            htmlFor={formatRadioButtonId('GG')}
          >
            GG
          </label>
        </div>
      </RadioGroup.Root>
    </>
  )
}
