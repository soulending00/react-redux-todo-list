import { motion, useMotionValue, useTransform } from 'framer-motion';

const CheckButton = ({ checked, handleCheck }) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  const checkVariants = {
    initial: {
      color: '#fff',
    },
    checked: { pathLength: 1 },
    unchecked: { pathLength: 0 },
  };

  const boxVariants = {
    checked: {
      background: '#fff',
      transition: { duration: 0.1 },
    },
    unchecked: { background: '#b1b1b1', transition: { duration: 0.1 } },
  };

  return (
    <motion.div
      animate={checked ? 'checked' : 'unchecked'}
      className="h-[30px] basis-8 shrink-0 rounded-xl flex items-center justify-center p-2 cursor-pointer"
      variants={boxVariants}
      onClick={() => handleCheck()}
    >
      <motion.svg
        className="w-full h-full stroke-teal-600 flex items-center justify-center"
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={checkVariants}
          animate={checked ? 'checked' : 'unchecked'}
          style={{ pathLength, opacity }}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="10"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
};

export default CheckButton;
