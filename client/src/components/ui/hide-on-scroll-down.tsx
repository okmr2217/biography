import { useEffect, useState } from "react";

export const HideOnScrollDown = ({children}: {
  children: React.ReactNode
}) => {
  const [position, setPosition] = useState(window.scrollY)
  const [visible, setVisible] = useState(true) 
    useEffect(()=> {
      const handleScroll = () => {
        let moving = window.scrollY
        
        setVisible(position > moving);
        setPosition(moving)
      };
      window.addEventListener("scroll", handleScroll);
      return(() => {
        window.removeEventListener("scroll", handleScroll);
      })
    })

  return (
    <div className={visible ? "opacity-100" : "opacity-0"}>{children}</div>
  )
}