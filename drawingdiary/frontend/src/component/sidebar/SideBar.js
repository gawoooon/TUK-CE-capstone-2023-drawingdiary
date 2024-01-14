const sidebarStyle = {
    height: 'calc(100% - 60px)',
    width: '90px',
    position: 'fixed',
    marginLeft: '60px',
    marginTop: '30px',
    bottom: '30px',
    zIndex: 1,
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F9F9F9',
    overflowX: 'hidden',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const linkStyle = {
    marginTop: '30px',
    padding: '8px 8px 6px 16px',
    textDecoration: 'none',
    fontSize: '10px',
    color: '#818181',
    display: 'block'
};

const SideBar = () => {
    return (
        <div style={sidebarStyle}>
            <a style={linkStyle} href='#home'>Home</a>
            <a style={linkStyle} href='#album'>Album</a>
            <a style={linkStyle} href='#analyze'>Analyze</a>
            <a style={linkStyle} href='#mypage'>My Page</a>
        </div>
    );
};

export default SideBar;