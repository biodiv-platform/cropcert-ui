import { axListCCAccessible } from "@services/cc.service";
import { decorate, observable } from "mobx";
import { createContext } from "react";

export class CCStore {
  CCAccessible: any[] = [];

  listCCAccessible = async () => {
    const list = await axListCCAccessible();
    this.CCAccessible = list.map(c => ({
      name: c.name,
      label: c.name,
      value: c.id,
      id: c.id,
      ccName: c.name,
      type: c.type,
    }));
  };
}

decorate(CCStore, {
  CCAccessible: observable,
});

export default createContext(new CCStore());
