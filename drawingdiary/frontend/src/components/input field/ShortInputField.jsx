const ShortInputField = ({ id, type, value, onChange, placeHolder }) => {
    const inputStyle = {
        height: '40px',
        width: '110px',
        margin: '0px 15px 30px 15px',
        paddingLeft: '10px',
        border: '1px solid #909090', 
        borderRadius: '10px',
        display: 'flex',
        minWidth: '0%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    };
    return(
        <div>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeHolder}
                style={inputStyle}
            />
        </div>
    )
};

export default ShortInputField;