import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'
let timer = null
export default class extends Component {
	static propTypes = {
		data: PropTypes.array.isRequired,
		show: PropTypes.bool,
		interval: PropTypes.object,
		innerStyle: PropTypes.object,
		orientation: PropTypes.string,
		top: PropTypes.string
	}
	constructor(props) {
		super(props)
		this.len = this.props.data.length
		this.intervalTime = this.props.interval.time || 3000
		this.top = this.props.top || '-400px'
		this.width =this.props.innerStyle.width?this.props.innerStyle.width/2 + 18 : 54
		this.loop = this.props.interval.loop && true
		this.currentIndex = 0
		this.direction = this.props.orientation || 'horizontal' 
 		this.state = {
			Ydeg: 0,
			show: this.props.show || false,
			navScale: 0
		}
	}
	componentWillMount(){
		if(this.state.show && this.loop){
			this.interval(this.intervalTime)
		}
	}
	componentWillUnmount(){
		clearInterval(timer)
	}
	mouseIn = ()=>{
		clearInterval(timer)
	}
	mouseOut = ()=>{
		if(this.state.show && this.loop){
			timer = this.interval(this.intervalTime)
		}
	}
	interval = (time)=>{
		return timer = setInterval(()=>{
			this.currentIndex++
			this.state.Ydeg -= 360/this.len
			this.setState({
				...this.state.Ydeg
			})
		},
		time)
	}
	changeShow = (e)=>{
		this.setState({
			show: !this.state.show,
			navScale: 1
		}, ()=>{
			if(this.state.show && this.loop){
				this.interval(this.intervalTime)
			} else {
				clearInterval(timer)
			}
		})
	}
	handleClick = (i, preIndex)=>{
		let angle = -360/this.len*(i-preIndex)
		if(angle < -180 ) {
			angle = 360 + angle
		} else if(angle>180){
			angle = -360 + angle
		}
		this.state.Ydeg += angle
		this.setState({
			...this.state.Ydeg
		})
		this.currentIndex = i
	}
	render(){
		let data = this.props.data || []
		let currentIndex = Math.abs(this.currentIndex % this.len)
		return (
			<div 
				className = "nav_3d_scene"
				style = {
					{	
						width: (this.direction==='horizontal')?`${2*(this.width)/Math.tan((2*Math.PI)/(2*this.len))+80}px`: '108px',
						height: (this.direction==='horizontal')?'112px':`${2*(this.width)/Math.tan((2*Math.PI)/(2*this.len))+80}px`,
						perspectiveOrigin: (this.direction==='horizontal')?'50% 50%':`50% ${this.width/Math.tan((2*Math.PI)/(2*this.len))}px`
					}
				}
				onClick={()=>{return false}}
				>
				<button 
					className = {(this.direction === 'horizontal')?"nav_3d_btn_horizontal":"nav_3d_btn_vertical"}
					type = 'button'
					onClick = {this.changeShow}
					>{this.state.show?'↑':'↓'}</button>
				<div 
					className = "nav_3d_container"
					style={{
						transform: `rotate${(this.direction==='horizontal')?"Y":"X"}(${this.state.Ydeg}deg)`,
						top: `${!this.state.show?this.top:'0px'}`,
						marginTop: (this.direction==='horizontal')?'48px': `${this.width/Math.tan((2*Math.PI)/(2*this.len))+30}px`
					}}>
                    { data.map((n, i)=>{
                        return (
		                        <div
	                    			key={i+'nav3d'}
	                    			className = {`nav_3d_children ${i === currentIndex?"active":""}`}
	                                style = {{
	                                	transform: `rotate${(this.direction === 'horizontal')?"Y":"X"}(${!this.state.show?0:(360/this.len*i)}deg) 
	                                	translateZ(${!this.state.show?0:(this.width/Math.tan((2*Math.PI)/(2*this.len)))}px)`,
	                                	...this.props.innerStyle
	                                }}
	                                onClick = { this.handleClick.bind(this, i, Math.abs(currentIndex))}
	                                onMouseEnter = {this.mouseIn}
	                                onMouseLeave = {this.mouseOut}
	                                >
	                                {i === currentIndex?<a href={n.path}>{n.name}</a>:<p>{n.name}</p>}
		                        </div>
	                        )             
	                    }
                	)}
				</div>
			</div>
		)
	}
}
