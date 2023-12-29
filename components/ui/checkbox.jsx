import * as React from "react"

import { cn } from "@utils/cn"

const Checkbox = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className={cn(
            "w-4 h-4 flex-shrink-0 border rounded-md",
            "bg-input-color placeholder-white",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }