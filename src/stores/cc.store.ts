import { axListCCAccessible } from "@services/cc.service";
import { decorate, observable } from "mobx";
import { createContext } from "react";

export class CCStore {
  CCAccessible: any[] = [];

  listCCAccessible = async () => {
    const list = await axListCCAccessible();
    this.CCAccessible = list.map(c => ({
      name: `${c.ccId} - ${c.ccName}`,
      label: `${c.ccId} - ${c.ccName}`,
      value: c.ccId,
      id: c.ccId,
      ccName: c.ccName,
      type: c.type,
    }));
  };
}

decorate(CCStore, {
  CCAccessible: observable,
});

export default createContext(new CCStore());
