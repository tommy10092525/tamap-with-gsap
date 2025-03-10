import React from 'react'
type StationButtonProps = {
  station: string
  selectedStation: string
  onClick: () => void
  ref: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}
const StationButton = React.forwardRef<HTMLDivElement, StationButtonProps>(({ station, onClick, selectedStation, children }, ref) => {
  return (
    <div onClick={onClick} ref={ref} className={station === selectedStation ? 'bg-black/80 dark:bg-white/80 shadow-lg rounded-xl p-3 text-white dark:text-black scale-90' : 'bg-black/50 dark:bg-white/50 shadow-lg rounded-xl text-white dark:text-black scale-90 p-3'}>
      {children}   
    </div>
  );
});

StationButton.displayName = 'StationButton';

export default StationButton;
