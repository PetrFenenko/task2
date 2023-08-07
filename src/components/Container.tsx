interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <section className="max-w-[90rem] w-full sm:w-[90%] mx-auto mt-3">
      {children}
    </section>
  );
};

export default Container;
