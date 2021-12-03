import { ReactNode } from "react"

type Button = {
  click:Function;
  children: ReactNode;
}

export default function Button({click, children}:Button) {
  return (
    <button onClick={() => { click() }}>{children}</button>
  )
};