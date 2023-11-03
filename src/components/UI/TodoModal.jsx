import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import Button from './Button';
import { addTodo, updateTodo } from '../../store/todoSlice';

const TodoModal = ({ type, modalOpen, setModalOpen, todo }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');

  const dropIn = {
    hidden: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
  };

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: format(new Date(), 'p, MM/dd/yyyy'),
          })
        );
        toast.success('Task added successfully');
      }
      if (type === 'update') {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success('Task Updated successfully');
        } else {
          toast.error('No changes made');
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[100] bg-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-400 w-[80%] max-w-screen-sm mx-auto flex items-center justify-center p-4 rounded-xl relative"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <form
              className="w-full flex flex-col"
              onSubmit={(e) => handleSubmit(e)}
            >
              <h1 className="text-3xl font-bold mx-auto my-5">
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>
              <label
                htmlFor="title"
                className="text-xl font-bold flex flex-col gap-3"
              >
                Title :
                <input
                  className="mt-2 mb-6 w-full p-4 bg-gray-300 rounded-xl text-lg font-semibold"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label
                htmlFor="type"
                className="text-xl font-bold flex flex-col gap-3"
              >
                Status :
                <select
                  className="mt-2 mb-6 w-full p-4 bg-gray-300 rounded-xl text-lg font-semibold"
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              <div className="flex justify-start items-center mt-2 mb-4 gap-2">
                <Button type="submit" color="bg-blue-700">
                  {type === 'add' ? 'Add Task' : 'Update Task'}
                </Button>
                <Button color="bg-gray-700" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;
