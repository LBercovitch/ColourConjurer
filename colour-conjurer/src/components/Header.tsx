function Header() {
  return (
    <div className="h-100 flex items-center justify-center relative overflow-hidden">
      <div className="relative sm:static flex flex-row items-center justify-center gap-8 text-center sm:text-left w-full h-full px-4">
        <h1 className="z-20 absolute sm:static bottom-15 max-w-50 md:max-w-80 lg:max-w-100 xl:max-w-150
          text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-50 text-shadow-amber-h1 font-slackey"
        >
          Colour Conjuror
        </h1>
        <img
          src="./colour-conjuror-cat.png"
          className="absolute sm:static top-5 z-10 h-64 sm:h-80 md:h-100 object-contain"
        />
      </div>
    </div>
  );
}

export default Header;
