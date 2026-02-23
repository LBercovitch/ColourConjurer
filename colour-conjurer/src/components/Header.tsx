function Header() {
  return (
    <div className="h-75 sm:h-100 bg-slate-950">
      <div className="relative">
        <h1 className="z-20 absolute max-w-50 md:max-w-100 top-40 md:top-30 lg:top-25 xl:top-15 left-10 md:left-15 lg:left-20 xl:left-25 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-50 text-shadow-amber-h1 font-slackey ">
          Colour Conjuror
        </h1>
        <img
          src="./colour-conjuror-cat.png"
          className="z-10 h-75 sm:h-100 absolute sm:right-10 md:left-95 lg:left-150 xl:left-180"
        />
      </div>
    </div>
  );
}

export default Header;
