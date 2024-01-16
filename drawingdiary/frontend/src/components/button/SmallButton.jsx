const buttonStyle = {
    height: '50px',
    width: '70px',
    marginBottom: '30px',
    backgroundColor: 'rgba(106, 156, 253, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    color: 'black',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
}

const Button = ({ text }) => {
    return (
        <button style={buttonStyle} type="button">
            {text}
        </button>
    )
}

export default Button