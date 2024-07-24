interface SliderProps {
  value?: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
  return (
    <input
      className="custom-range bg-gray-300 h-3 w-64 appearance-none overflow-hidden rounded-lg"
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={value}
      onChange={onChange}
    />
  );
};

export default Slider;
