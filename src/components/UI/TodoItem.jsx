import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../../store/todoSlice';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  function handleCheck() {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
    );
  }

  function handleDelete() {
    dispatch(deleteTodo(todo.id));
    toast.success('Todo Deleted Successfully');
  }

  function handleUpdate() {
    setUpdateModalOpen(true);
  }

  return (
    <>
      <motion.div
        className="flex items-center justify-between p-4 bg-white/40 mb-3 rounded-lg last:mb-0"
        variants={child}
      >
        <div className="flex items-center justify-start gap-4">
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className="flex flex-col gap-3 overflow-hidden">
            <p
              className={`text-xl font-semibold break-all ${
                todo.status === 'complete' && 'opacity-80 line-through'
              }`}
            >
              {todo.title}
            </p>
            <p className="block text-lg font-semibold">
              {format(new Date(todo.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div
            className="bg-gray-400 flex items-center justify-center cursor-pointer p-3 rounded-xl hover:bg-gray-800 hover:text-white"
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete size={30} />
          </div>
          <div
            className="bg-gray-400 flex items-center justify-center cursor-pointer p-3 rounded-xl hover:bg-gray-800 hover:text-white"
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit size={30} />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );
};

export default TodoItem;
