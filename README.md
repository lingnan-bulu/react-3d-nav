# react-3d-nav
this is a react  3d navigation


## 横向效果

![Image text](https://github.com/1140571314/react-3d-nav/blob/master/example_image/horizontal2.gif)


## 纵向效果

![Image text](https://github.com/1140571314/react-3d-nav/blob/master/example_image/vertical.gif)


1, 安装 
npm i react-3d-nav --save

2, import 


import Nav3d from 'react-3d-nav'


class xxxx extends React.Component {


  ...

  
  render(){
      
      return (
          
          ........
          
          <Nav3d 
          
            data = {[
                
                {
                    
                    name: 'list1',
                    
                    path: '/month/farm'
                    
                }
            ]}
            
          />
          
      )
      
  }
  
}

```

3, api
        <Nav3d 
            data = {[
                {
                    name: '11111eeeeeeeeeee',
                    path: '/month/farm'
                },
                {
                    name: 'list1',
                    path: '/123'
                },
                {
                    name: 'list1',
                    path: '/123'
                },
                {
                    name: 'list1',
                    path: '/123'
                },
                {
                    name: 'list1',
                    path: '/123'
                },
                ]} // name是导航栏显示的文字， path是导航栏的跳转地址 必须项
            interval = {{ 
                            loop: true,  
                            time: 1000
                        }}  //  是否自动旋转， loop 默认为true time是旋转的时间间隔
            innerStyle = {{
                width: 80
            }}  // 导航栏的样式 有默认样式
            orientation = "vertical"  // horizontal   // 排列方式， horizontal 为水平模式 vertical 为竖直模式 默认为水平
            show = {true}  // 初始化加载是否显示导航栏 默认显示
            top =  '-500px'  // 点击消失时导航组件的位置 默认为-400
        />

