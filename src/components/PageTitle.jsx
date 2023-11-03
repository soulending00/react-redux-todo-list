function PageTitle({ children, ...rest }) {
  return (
    <p
      className="inline-block w-full text-3xl font-bold uppercase text-center mx-auto mb-5 text-gray-700"
      {...rest}
    >
      {children}
    </p>
  );
}

export default PageTitle;
