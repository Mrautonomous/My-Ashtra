"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "./button";

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
      <DialogPrimitive.Content
        ref={ref}
        className={`fixed left-1/2 top-1/2 z-50 max-h-[666px] max-w-[806px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg duration-200 sm:rounded-lg sm:w-[90%] ${className}`}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100">
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);
<Button />;
DialogContent.displayName = DialogPrimitive.Content.displayName;

export const DialogHeader = ({ children }) => (
  <div className="flex flex-col space-y-2 text-center sm:text-left">
    {children}
  </div>
);

export const DialogTitle = ({ className, ...props }) => (
  <DialogPrimitive.Title
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
);
