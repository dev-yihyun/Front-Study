import { atom, selector } from "recoil";

export const todoListState = atom({
    key: 'todoListState',
    default: [
        {
            id:1,
            text:"할일1",
            isComplete:false
        },
        {
            id:2,
            text:"할일2",
            isComplete:false
        },
    ],
});

export const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'Show All',
});

export const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({get}) => {
      const filter = get(todoListFilterState);
      const list = get(todoListState);
  
      switch (filter) {
        case 'Show Completed':
          return list.filter((item) => item.isComplete);
        case 'Show Uncompleted':
          return list.filter((item) => !item.isComplete);
        default:
          return list;
      }
    },
});