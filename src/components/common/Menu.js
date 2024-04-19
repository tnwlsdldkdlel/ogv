import { useNavigate } from 'react-router-dom'

const Menu = () => {
    const navigator = useNavigate();

    const handleMove = (path) => {
        navigator(path);
    }

    const handelMouseEnter = (e) => {
        var target = e.target.className;

        if (!target.includes("active")) {
            e.target.className += " active";
        }
    }

    const handelMouseLeave = (e) => {
        var target = e.target.className;

        if (target.includes("active")) {
            e.target.className = target.replaceAll("active", "");
        }
    }

    return (
        <div className="menu-box">
            <div className="menu-list" onMouseLeave={handelMouseLeave} onMouseEnter={handelMouseEnter} onClick={() => handleMove('/admin/userMgmt')}>유저관리</div>
            <div className="menu-list" onMouseLeave={handelMouseLeave} onMouseEnter={handelMouseEnter} onClick={() => handleMove('userMgmt')}>영화관관리</div>
            <div className="menu-list" onMouseLeave={handelMouseLeave} onMouseEnter={handelMouseEnter} onClick={() => handleMove('userMgmt')}>영화관리</div>
            <div className="menu-list" onMouseLeave={handelMouseLeave} onMouseEnter={handelMouseEnter} onClick={() => handleMove('userMgmt')}>광고관리</div>
            <div className="menu-list" onMouseLeave={handelMouseLeave} onMouseEnter={handelMouseEnter} onClick={() => handleMove('userMgmt')}>스위트관리</div>
            <div className="menu-list" onMouseLeave={handelMouseLeave} onMouseEnter={handelMouseEnter} onClick={() => handleMove('userMgmt')}>통계관리</div>
        </div>
    );
}

export default Menu;