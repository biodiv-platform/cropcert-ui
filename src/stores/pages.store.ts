import { axListPages } from "@services/pages.services";
import { decorate, observable } from "mobx";
import { createContext } from "react";

export class PagesStore {
  pages = [];

  listPages = async () => {
    this.pages = await axListPages();
  };
}

decorate(PagesStore, {
  pages: observable
});

export default createContext(new PagesStore());
