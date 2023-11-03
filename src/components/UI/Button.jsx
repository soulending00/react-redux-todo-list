const Button = ({ type, color = 'bg-blue-700', children, ...rest }) => {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`px-4 py-2 rounded-lg text-lg font-semibold capitalize cursor-pointer ${color} text-white`}
      {...rest}
    >
      {children}
    </button>
  );
};

const SelectButton = ({ children, id, ...props }) => {
  return (
    <select
      id={id}
      className="px-4 py-3 rounded-lg text-lg font-semibold capitalize cursor-pointer bg-emerald-700 text-white "
      {...props}
    >
      {children}
    </select>
  );
};

export { SelectButton };
export default Button;
