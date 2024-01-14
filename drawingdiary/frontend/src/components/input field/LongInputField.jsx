const LongInputField = ({ id, type, value, onChange, placeHolder }) => {
    return(
        <div>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeHolder}
                style={{
                    height: '30px',
                    width: '400px',
                    paddingLeft: '10px',
                    marginBottom: '20px',
                    border: '1px solid #909090', 
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                }}
            />
        </div>
    )
};

export default LongInputField;