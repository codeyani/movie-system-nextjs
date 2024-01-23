import * as React from "react"

import { cn } from "@utils/cn"

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "text-base text-white bg-input-color placeholder-white flex h-14 w-full rounded-md border border-input px-3 py-2 ",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }