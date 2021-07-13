import React  from "react";
import {cleanup, fireEvent, render, RenderResult, wait} from '@testing-library/react'

import Menu ,{MenuProps} from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu"
// 准备两个属性
const testProps : MenuProps = {
    defaultIndex : '0',
    onSelect : jest.fn(),
    className : 'test'
}
const testVerProps : MenuProps = {
    defaultIndex : '0',
    mode : "vertical" // 纵向
}
// 准备一个测试函数
const generateMenu =  (props: MenuProps) => {
    return (
        <Menu {...props}>
        <MenuItem index={'0'}>
       active
        </MenuItem>
        <MenuItem disabled  index={'1'}>
        disabled
        </MenuItem>
        <MenuItem  index={'2'}>
        ppx
        </MenuItem>
        <SubMenu title="dropdown">
        <MenuItem>
        drop1
        </MenuItem>
        </SubMenu>
      </Menu>
    )
  
}   
const createStyleFile = () => {
    const cssFile : string = `
    .viking-submenu {
        display:none;
    }
    .viking-submenu.menu-opened{
        display: block;
    }
    `
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
    return style;
}
let wrapper: RenderResult, menuElement:HTMLElement,activeElement:HTMLElement,
                disabledElement :HTMLElement;
describe('test Menu and MenuItem component', () => {
    beforeEach(()=>{
        wrapper = render(generateMenu(testProps));
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    })
    // 测试基础的class 
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('viking-menu test'); // 是否有加的class 和 自定义的test 
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3); // li的长度是否为 3 这样判断
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4); //选择同层级的li 
       expect(activeElement).toHaveClass('menu-item is-active' );  // 激活时有没有对应的class
       expect(disabledElement).toHaveClass('menu-item is-disabled' ); // disabled 有么有对应的class
    })
    //测试激活和点击
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('ppx');  // 拿到 ppx 
        fireEvent.click(thirdItem);                 // 使用fireEvent（自动引入）.click(xx)点击 
        expect(thirdItem).toHaveClass('is-active'); // 点击之后被激活
        expect(activeElement).not.toHaveClass('is-active');// 之前的元素 is-active被取消掉
        expect(testProps.onSelect).toHaveBeenCalledWith('2');//测试当前选择的是哪个 回调有没有执行
        // 追加测一下 disabled
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
    })
    //测试纵向
    it('should render vertical mode when mode set to vertical' , () => {
        cleanup();                                              // 这个解决方案 加cleanup()清除掉之前掉调用
        const wrapper = render(generateMenu(testVerProps));
        const menuElement = wrapper.getByTestId('test-menu');  // 单独这样写会报错 因为beforeEach里面渲染了一次wrapper
        expect(menuElement).toHaveClass(' menu-vertical');
    })
    it('should dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible();
        const dropdownElement = wrapper.getByText('dropdown'); //拿到title="dropdown" 的 submenu
        fireEvent.mouseEnter(dropdownElement); // 鼠标进入 hover 时 出现 drop1 
        await wait(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible();
        })
        fireEvent.mouseLeave(dropdownElement); // 鼠标离开 不出现 drop1 
        await wait(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible();
        })
        //测试点击
        fireEvent.click(wrapper.getByText('drop1'));
        expect(testProps.onSelect).toBeCalledWith('3-0');
    })
})
