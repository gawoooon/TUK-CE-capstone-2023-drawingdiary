const LongInputField = ({ id, type, value, onChange, placeHolder }) => {
    const inputStyle = {
        height: '40px',
        width: '420px',
        paddingLeft: '10px',
        margin: '0px 15px 30px 15px',
        border: '1px solid #909090', 
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
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

export default LongInputField;