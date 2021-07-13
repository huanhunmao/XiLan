import React,{FunctionComponentElement, useContext, useState} from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import  Transition  from '../Transition/transition';
export interface SubMenuProps{
    index ?: string,
    title : string,
    className ?: string
}

const SubMenu : React.FC<SubMenuProps> = (props) => {
    const {index,title,className,children} = props;
    const context = useContext(MenuContext);
    // 单独加这个 context.defaultOpenProps 是 string和 undefined 类型
    // 所以需要下面的类型断言
    const openedSubMenus = context.defaultOpenProps as Array<string>;
    const isOpend = (index && context.mode == 'vertical') ? openedSubMenus.includes(index) : false;
        //useState
   const [menuOpen, setOpen] = useState(isOpend)
    const classes = classNames('menu-item submenu-item', className,{
        'is-active' : context.index === index,
        // 纵向需要添加这两个class  
        'is-opened' : menuOpen,
        'is-vertical' : context.mode === 'vertical' 
    })
    // 点击
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen)
    }
    //handleMouse
    let timer : any;
    const handleMouse = (e: React.MouseEvent, traggle : boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        setTimeout(() => {
            setOpen(traggle)
        },300)

    }
    //纵向 点击
    const clickEvents = context.mode === 'vertical' ? {
        onClick : handleClick
    } : {}
    // 横向
    const hoverEvents = context.mode != 'vertical' ? {
        onMouseEnter : (e: React.MouseEvent) => {handleMouse(e,true)},
        onMouseLeave : (e: React.MouseEvent) => {handleMouse(e,false)}
    } :  {}
    // 展开函数
    const renderChildren = () => {
        const subMenuClasses = classNames('viking-submenu' , className, {
            'menu-opened' : menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if(childElement.type.displayName == 'MenuItem'){
                // return childElement
                return React.cloneElement(childElement,{
                    index: `${index}-${i}`
                })
            }else{
                console.error('Warnning: is not a MenuItem');
            }
        })
        return (
            <Transition in={menuOpen} timeout={300} animation ='zoom-in-bottom' >
            <ul  className={subMenuClasses}>
                {childrenComponent}
            </ul>
            {/* <p>test</p> */}
            </Transition>
         
        )
    }
    return ( 
        // 传入  {...hoverEvents}  {...clickEvents}
        <li key={index} className={classes} {...hoverEvents}>
            {/* 两部分组成 */}
            {/* 第一部分title  */}
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon='arrow-down' className='arrow-icon'/>
            </div>
            {/* 第二部分是展开的内容 */}
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;