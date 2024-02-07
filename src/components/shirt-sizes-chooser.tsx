import { useCart } from '@/context/cart-context'
import { ShirtSizesType } from '@/data/types/shirt-sizes-type'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useEffect, useState } from 'react'

interface ShirtSizesChooserProps {
  preChosenShirtSize?: ShirtSizesType
  productId?: number
  index: number
}

export function ShirtSizesChooser({
  preChosenShirtSize,
  index,
  productId,
}: ShirtSizesChooserProps) {
  const [shirtSize, setShirtSize] = useState<ShirtSizesType | ''>(
    preChosenShirtSize || '',
  )
  const isAnyRadioButtonChecked = shirtSize.length !== 0
  const styleToLowOpacity =
    'has-[button[data-is-any-radio-checked=true]]:opacity-40'

  const { changeShirtSize } = useCart()

  const shirtSizes: ShirtSizesType[] = ['P', 'M', 'G', 'GG']

  useEffect(() => {
    if (preChosenShirtSize) {
      setShirtSize(preChosenShirtSize)
    }
  }, [preChosenShirtSize])

  function handleChangeShirtSize(newShirtSize: ShirtSizesType) {
    setShirtSize(newShirtSize)

    if (preChosenShirtSize && productId) {
      changeShirtSize(productId, preChosenShirtSize, newShirtSize)
    }
  }

  function formatRadioButtonId(size: ShirtSizesType) {
    return `${size}${index}`
  }

  return (
    <>
      <span className="block font-semibold">Tamanhos</span>

      <RadioGroup.Root
        className="flex gap-2 flex-wrap"
        onValueChange={handleChangeShirtSize}
        defaultValue={shirtSize}
        name="shirtSize"
      >
        {shirtSizes.map((size) => (
          <div
            className={`h-7 w-12 md:h-9  md:w-14 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800 text-sm font-semibold group has-[button[data-state=checked]]:bg-violet-700 has-[button[data-state=checked]]:border-violet-700 hover:bg-zinc-900 ${
              shirtSize !== size ? styleToLowOpacity : ''
            }`}
            key={`${size}${index}`}
          >
            <RadioGroup.Item
              className="hidden"
              value={size}
              id={formatRadioButtonId(size)}
              data-is-any-radio-checked={isAnyRadioButtonChecked}
              checked={shirtSize === size}
            />
            <label
              className="w-full h-full text-center flex items-center justify-center cursor-pointer transition-colors"
              htmlFor={formatRadioButtonId(size)}
            >
              {size}
            </label>
          </div>
        ))}
      </RadioGroup.Root>
    </>
  )
}
