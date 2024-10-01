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
// 필터 상태 (모든 항목, 완료된 항목, 미완료 항목)
export const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'Show All',
  });
  
  // 필터링된 Todo 리스트 선택자
  export const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({ get }) => {
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
/* 
const todoListStatsState = selector({
    key: 'todoListStatsState',
    get: ({get}) => {
      const todoList = get(todoListState);
      const todoCompleted = todoList.filter((item) => item.isComplete);
      const todoUncompleted = todoList.filter((item) => !item.isComplete);
  
      return {
        todoCompleted,
        todoUncompleted,
      };
    },
}); */