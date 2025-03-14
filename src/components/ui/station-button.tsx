import React from 'react'
type StationButtonProps = {
  station: string
  selectedStation: string
  onClick: () => void
  ref: React.RefObject<HTMLButtonElement>
  children: React.ReactNode
}
const StationButton = React.forwardRef<HTMLButtonElement, StationButtonProps>(({ station, onClick, selectedStation, children }, ref) => {
  return (
    <button 
      onClick={onClick} 
      ref={ref} 
      className={station === selectedStation ? 'bg-black/80 dark:bg-white/80 shadow-lg rounded-xl p-3 text-white dark:text-black scale-90' : 'bg-black/50 dark:bg-white/50 shadow-lg rounded-xl text-white dark:text-black scale-90 p-3'}
      aria-pressed={station === selectedStation}
      aria-label={station}
      type="button"
    >
      {children}   
    </button>
  );
});

StationButton.displayName = 'StationButton';

export default StationButton;
