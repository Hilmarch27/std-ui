import React from 'react'

export const components = {
  // ui preview
  'input-currency': {
    name: 'input-currency',
    type: 'registry:ui',
    registryDependencies: ['input'],
    files: [
      {
        type: 'registry:ui',
        content:
          '"use client";\r\n\r\nimport type React from "react";\r\nimport { forwardRef, useEffect, useState } from "react";\r\nimport { Input } from "@/components/ui/input";\r\nimport { cn } from "@/lib/utils";\r\n\r\nexport interface InputCurrencyProps\r\n  extends Omit<\r\n    React.InputHTMLAttributes<HTMLInputElement>,\r\n    "onChange" | "value"\r\n  > {\r\n  onChange?: (value: string) => void;\r\n  value?: string;\r\n  currency?: string;\r\n  locale?: string;\r\n}\r\n\r\nconst InputCurrency = forwardRef<HTMLInputElement, InputCurrencyProps>(\r\n  (\r\n    {\r\n      className,\r\n      onChange,\r\n      value = "",\r\n      currency = "IDR",\r\n      locale = "id-ID",\r\n      ...props\r\n    },\r\n    ref\r\n  ) => {\r\n    const [displayValue, setDisplayValue] = useState(value);\r\n\r\n    const formatCurrency = (value: string) => {\r\n      const number = Number.parseInt(value.replace(/\\D/g, ""));\r\n      if (isNaN(number)) return "";\r\n\r\n      return new Intl.NumberFormat(locale, {\r\n        style: "currency",\r\n        currency: currency,\r\n        minimumFractionDigits: 0,\r\n        maximumFractionDigits: 0,\r\n      }).format(number);\r\n    };\r\n\r\n    useEffect(() => {\r\n      setDisplayValue(formatCurrency(value));\r\n    }, [value, currency, locale]);\r\n\r\n    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {\r\n      const rawValue = event.target.value.replace(/\\D/g, "");\r\n      setDisplayValue(formatCurrency(rawValue));\r\n      onChange?.(rawValue);\r\n    };\r\n\r\n    return (\r\n      <Input\r\n        {...props}\r\n        ref={ref}\r\n        className={cn("font-mono", className)}\r\n        value={displayValue}\r\n        onChange={handleChange}\r\n      />\r\n    );\r\n  }\r\n);\r\n\r\nInputCurrency.displayName = "InputCurrency";\r\n\r\nexport { InputCurrency };\r\n',
        path: 'ui/input-currency.tsx',
        target: 'components/ui/input-currency.tsx'
      }
    ],
    component: React.lazy(() => import('./demo/ui/input-currency'))
  }
} as const
