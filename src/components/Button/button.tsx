import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Default = 'default',
    Primary = 'primary',
    Danger = 'danger',
    Link = 'link'
}

// export type ButtonSize = 'lg' | 'sm'
// export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    className ?: string,
    btnSize ?:  ButtonSize,
    btnType ?: ButtonType,
    children : React.ReactNode,
    disabled ?: boolean,
    href ?: string,
   
}
// 拿到button 所有属性
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLLIElement>
//拿到上面的BaseButtonProps 所有属性 
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLLIElement>
// 两个合在一起并导出 
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button : React.FC<ButtonProps> = (props) => {
    const {btnSize,
         btnType,
         children,
         href,
         disabled,
         className,
         ...restProps
        } = props
    const classes = classNames('btn',className,{
        [`btn-${btnType}`] : btnType,
        [`btn-${btnSize}`] : btnSize,
        disabled : (btnType === ButtonType.Link) && disabled
    })
    if(btnType === ButtonType.Link && href){
        return(
            <a className={classes}  
            href={href}
        //    {...restProps}
            >
                {children}
            </a>
        )
    }else{
        return (
            <button className={classes} 
            disabled={disabled}  
           // {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps={
    disabled:false,
    btnType:ButtonType.Default
}

export default Button