import React,{useContext} from "react";
import classNames from "classnames";
import {MenuContext} from './menu'
export interface MenuItemProps {
    index ?: string,
    className ?: string,
    disabled ?: boolean,
    style ?: React.CSSProperties
}

const MenuItem : React.FC<MenuItemProps> = (props) => {
    const {
        index,
        className,
        disabled,
        style,
        children
    } = props
    const context = useContext(MenuContext);
    const classes = classNames('menu-item', className, {
        'is-disabled' : disabled,
        'is-active' : context.index === index  //判断为激活状态
    })
    const handleClick = () => {
        if(context.onSelect && !disabled && (typeof index === 'string')){
            context.onSelect(index);  // 注意此处index为可选的可能为undefined改成必传
        }                             // 更改 MenuItemProps里的number
    }

    return(
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}
MenuItem.displayName  = 'MenuItem'
export default MenuItem;