import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddForm from './components/AddForm';
import TodoList from './components/TodoList';
import UpdateForm from './components/UpdateForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/addetails" element={<AddForm />} />
        <Route path="/updateTodo/:id" element={<UpdateForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
