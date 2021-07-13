import React,{useState,createContext}  from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";


type MenuMode = 'horizontal' | 'vertical'; //  这个表示横向 ｜ 纵向 模式
// 定义 onSelect 类型方便下面使用
type SelectCallback = (selectedIndex: string) => void
export interface MenuProps {
    defaultIndex ?: string;
    className ?: string;
    mode ?: MenuMode;
    style ?: React.CSSProperties;
    onSelect ?: SelectCallback;
    defaultOpenProps ?: string[];
}

interface IMenuContext {
    index : string
    onSelect ?: SelectCallback,
    mode ?: MenuMode,
    defaultOpenProps ?: string[];
}

// createContext 创建并传入初始值 
export const MenuContext = createContext<IMenuContext>({index:'0'})
const Menu : React.FC<MenuProps> = (props) => {
    const {
        defaultIndex,
        className,
        mode,
        style,
        onSelect,
        children,
        defaultOpenProps
    } =  props
    // 使用useState
    const [currentActive,setActive] = useState(defaultIndex)
    const classes = classNames('viking-menu' ,className,
        {'menu-vertical': mode === 'vertical', 
        'menu-horizontal': mode !== 'horizontal'
    }) // 纵向
    
    // 点击事件 如果选择了 设置当前index 为 active状态
    const handleClick = (index : string) => {
        setActive(index);
        if(onSelect){
            onSelect(index)
        }
    }
    const passedContext : IMenuContext = {
        index : currentActive ? currentActive : '0',
        onSelect : handleClick,
        mode:mode,
        defaultOpenProps
    }
   const renderChildren = () => {
       return (
         
           React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const {displayName} = childElement.type;
            if(displayName === 'MenuItem' || displayName === 'SubMenu'){
                return React.cloneElement(childElement, {
                    // index
                    index : index.toString()
                })
            }else{
                console.error('Warnning: node err');
            }
           })
       )
   }
        return (
            <ul className={classes} style = {style} data-testid="test-menu">
                <MenuContext.Provider value={passedContext}>
                {renderChildren()}
                </MenuContext.Provider>
            </ul>
        )
}

Menu.defaultProps = {
    defaultIndex : '0',
    mode : 'horizontal', // 默认横向
    defaultOpenProps : []
}

export default Menu;