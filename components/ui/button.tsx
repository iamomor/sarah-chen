import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#1a2744] text-white rounded-none uppercase tracking-widest text-xs font-semibold hover:bg-[#1a2744]/90",
        outline:
          "border border-[#1a2744] text-[#1a2744] bg-transparent rounded-none uppercase tracking-widest text-xs hover:bg-[#1a2744]/5",
        secondary:
          "border border-[#1a2744] text-[#1a2744] bg-transparent rounded-none uppercase tracking-widest text-xs hover:bg-[#1a2744]/5",
        ghost:
          "underline text-[#6b7280] text-sm hover:text-[#1a1a1a] bg-transparent hover:bg-transparent rounded-none",
        gold:
          "bg-[#c9a96e] text-[#1a2744] rounded-none uppercase tracking-widest text-xs font-semibold hover:bg-[#c9a96e]/90",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 gap-2",
        xs: "h-8 px-4 text-[10px] gap-1",
        sm: "h-10 px-6 text-[11px] gap-1.5",
        lg: "h-14 px-10 text-[13px] gap-2.5",
        icon: "size-12",
        "icon-xs": "size-8",
        "icon-sm": "size-10",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
