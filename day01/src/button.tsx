import { ReactNode } from "react"

type Button = {
  click:Function;
  children: ReactNode;
  className?: string;
}

export default function Button({click, className, children}:Button) {
  return (
    <button className={className} onClick={() => { click() }}>{children}</button>
  )
};