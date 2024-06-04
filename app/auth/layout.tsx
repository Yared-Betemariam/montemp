const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-1 flex-col justify-center items-center py-12 relative bg-neutral-50/50">
      <div className="bg-pattern opacity-[0.035] inset-0 absolute -z-10" />
      {children}
    </main>
  );
};
export default layout;
