import React from "react";
import classNames from "classnames";
import {FontAwesomeIcon,FontAwesomeIconProps} from '@fortawesome/react-fontawesome'

export type ThemeProps = 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

// 继承自FontAwesomeIconProps 并添加自己的属性
export interface  IconProps extends  FontAwesomeIconProps {
    theme ?: ThemeProps
}

const Icon : React.FC<IconProps> = (props) => {
    // icon-primary
    const {className, theme, ...restProps} = props;
    const classes = classNames('viking-icon' , className, {
        [`icon-${theme}`] : theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps}/>
    )
}

export default Icon;