function Button({ children, onClick, disabled }) {
  return (
    <button
      className={disabled ? `formButtonDisabled` : `formButton`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
