export function MainFrame({ children }) {
  return (
    <div className="box-container">
      <img src="./../src/assets/icons/waves-header.svg" alt="wave header" className="w-full" />
      {children}
      <img src="./../src/assets/icons/waves-bottom.svg" alt="wave bottom" className="w-full" />
      {/* <!-- blue waves end --> */}
    </div>
  );
}
export function BoxContainer({ children }) {
  return <div className="box-container">{children}</div>;
}

export function ContentBody({ header, main }) {
  return (
    <div className="content-body h-full relative">
      {header}
      {main}
    </div>
  );
}

export function MainContent({ children }) {
  return (
    <>
      <main className="bg-white px-10 py-3 relative grow">{children}</main>
    </>
  );
}
