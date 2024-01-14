const shortsidebarStyle = {
    height: '400px',
    width: '80px',
    position: 'fixed',
    marginTop: '30px',
    marginLeft: '60px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F9F9F9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const linkStyle = {
    marginTop: '30px',
    padding: '6px 8px',
    textDecoration: 'none',
    fontSize: '10px',
    color: '#818181',
    display: 'block'
};

const ShortSidebar = () => {
    return (
        <div style={shortsidebarStyle}>
            <a style={linkStyle} href='#back'>Back</a>
            <a style={linkStyle} href='#home'>Home</a>
            <a style={linkStyle} href='#album'>Album</a>
            <a style={linkStyle} href='#analyze'>Analyze</a>
            <a style={linkStyle} href='#mypage'>My Page</a>
        </div>
    );
};

export default ShortSidebar;

