const buttonStyle = {
    height: '50px',
    width: '250px',
    marginBottom: '30px',
    backgroundColor: 'rgba(106, 156, 253, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    border: 'none',
    cursor: 'pointer',
    color: 'black',
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const Button = ({ text, onClick }) => {
    return (
        <button style={buttonStyle} type="submit" onClick={onClick}>
            {text}
        </button>
    )
}

export default Button