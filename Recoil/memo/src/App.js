import { RecoilRoot } from "recoil";
import ButtonCard from "./ButtonCard";
import TodoListCard from "./TodoListCard";

function App() {
  return (
    <>
    <RecoilRoot>
      <ButtonCard/>
      <TodoListCard/>
    </RecoilRoot>
    </>
  );
}

export default App;
