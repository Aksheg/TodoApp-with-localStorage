const InputField = (props) => {
    const { onChange, onKeyDown, className, placeholder, value } = props;
    return (
      <input
        type="text"
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        value={value}
      />
    );
  };
  
  const Button = (props) => {
    const { type, onClick, className, btnText } = props;
    return (
      <button type={type} onClick={onClick} className={className}>
        {btnText}
      </button>
    );
  };
  
  export { InputField, Button };