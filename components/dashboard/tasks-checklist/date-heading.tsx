const DateHeading = () => {
  const todaysDate = new Date().toLocaleDateString("en-gb", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="text-lg font-semibold tracking-tight flex items-center gap-x-2">
      <p>{todaysDate.split(" ").slice(1).join(" ")}</p>

      <span className="text-xs">●</span>

      <p>Today</p>

      <span className="text-xs">●</span>

      <p>{todaysDate.split(" ")[0]}</p>
    </div>
  );
};

export default DateHeading;
