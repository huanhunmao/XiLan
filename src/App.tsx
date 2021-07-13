import React,{useState} from 'react'
import Button,{ButtonSize,ButtonType} from './components/Button/button';
import MenuItem from './components/Menu/menuItem';
import Menu from './components/Menu/menu';
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas} from '@fortawesome/free-solid-svg-icons';
import Transition from './components/Transition/transition'
library.add(fas)

function App() {
  const [show,setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
      {/* <Icon icon='arrow-down'  theme='danger' size='10x'/> */}
        <Menu  onSelect={(index) => {alert(index)}} mode='horizontal' defaultOpenProps={['2']}>
          <MenuItem >
          cool link1
          </MenuItem>
          <MenuItem disabled  >
          cool link2
          </MenuItem>
          {/* 测试SubMenu */}
          <SubMenu title="dropdown">
          <MenuItem>
          dropdown 1
          </MenuItem>
          <MenuItem>
          dropdown 2
          </MenuItem>
          </SubMenu>
          <MenuItem  >
          cool link3
          </MenuItem>
        </Menu>
      </header>
      <div>
      <Button onClick={() => {setShow(!show)}}>Toggle</Button>
     <Transition in={show} timeout={300} animation="zoom-in-bottom">
       <div>
       <p>test</p>
        <p>test</p>
        <p>test</p>
       </div>
     </Transition>
      </div>
   
    </div>
  );
}

export default App;
