import React  from "react";
import {render, fireEvent} from '@testing-library/react'
import Button, {ButtonProps,ButtonSize,ButtonType}  from './button'

// 对应第一个test 
const defaultProps = {
    onClick : jest.fn() // 使用jest.fn() mock function回调
}

// 对应第二个 test 需要将{ButtonProps,ButtonSize,ButtonType}从button先引入
const testProps : ButtonProps = {
    btnType : ButtonType.Primary,
    btnSize : ButtonSize.Large,
    className : 'fhj'
}

// 对应第三个test
const testLink : ButtonProps ={
    btnType : ButtonType.Link,
    href : 'http:/www.ddd.com'
}

//对应第四个 
const disabledProps : ButtonProps ={
    disabled:true,
    onClick : jest.fn()
}
describe('test Button component' , ()=>{
    // 使用test关键字或者 it 
    test('should render the correct default button' , () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>);
        const element = wrapper.getByText('Nice'); // queryByText可能返回null导致下面不能用
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON'); // 测试 element.tagName
        expect(element).toHaveClass('btn btn-default'); // 测试 className
        fireEvent.click(element);
        // expect(defaultProps.onClick).toHaveBeenCalled(); // 点击有么有效果
    })
    test('shold render the correct component based on different props',() => {
        const wrapper = render(<Button {...testProps}>Nice</Button>);
        const element = wrapper.getByText('Nice'); 
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg fhj') // 测试 属性 className
    })
    test('shold render a link when btnType equals link and href is provided', ()=> {
        const wrapper = render(<Button {...testLink}>Link</Button>);
        const element = wrapper.getByText('Link'); 
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');       // 测试 element.tagName
        expect(element).toHaveClass('btn btn-link'); 
    })      
    test('should render disabled button when disabled set to true',() => {
        const wrapper = render(<Button {...disabledProps}>Link</Button>); 
        const element = wrapper.getByText('Link') as HTMLButtonElement;    // 注意此处为 HTMLButtonElement 否则下面不能使用disabled
        expect(element).toBeInTheDocument();                               // HTMLElement
        expect(element.disabled).toBeTruthy(); // 初始值是 true 所以此处判断true
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled(); //无法点击
    })
})
