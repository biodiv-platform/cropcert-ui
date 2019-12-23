import { axListPages } from "@services/page.service";
import { Action, action, Thunk, thunk } from "easy-peasy";
import { Page } from "types/pages";

export interface IPageStore {
  pages: Page[];
  setPages: Action<IPageStore, Page[]>;
  addPage: Action<IPageStore, Page>;
  updatePage: Action<IPageStore, Page>;
  removePage: Action<IPageStore, number>;
  allPages: Thunk<IPageStore>;
}

const pagesStore: IPageStore = {
  pages: [],
  setPages: action((state, pages) => {
    state.pages = pages;
  }),
  addPage: action((state, page) => {
    state.pages = [...state.pages, page];
  }),
  updatePage: action((state, page) => {
    state.pages = [...state.pages.filter(({ id }) => id !== page.id), page];
  }),
  removePage: action((state, pageId) => {
    state.pages = state.pages.filter(({ id }) => id !== pageId);
  }),
  allPages: thunk(async actions => {
    actions.setPages(await axListPages());
  })
};

export default pagesStore;
