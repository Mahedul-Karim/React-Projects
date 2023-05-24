import React, { useContext, useState } from "react";

const SidbarContext = React.createContext();

function SidebarProvider(props) {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar=function(){
    setIsOpen(true);
  }

  const closeSidebar=function(){
    setIsOpen(false);
  }
  return (
    <SidbarContext.Provider value={{isOpen,openSidebar,closeSidebar}}>
      {props.children}
    </SidbarContext.Provider>
  );
}

export default SidebarProvider;
export const useSidebar = function () {
  return useContext(SidbarContext);
};
