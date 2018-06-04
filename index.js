import React, { Component } from 'react'
import propTypes from 'prop-types'
import './index.less'
let timer = null
export default class nav3d extends Component {
	constructor(props) {
		super(props)
		this.len = this.props.data.length
		this.intervalTime = this.props.interval || 3000
		this.top = this.props.innerStyle.top || '-400px'
		this.currentIndex = 0
 		this.state = {
			Ydeg: 0,
			show: this.props.show || false,
			navScale: 0
		}
	}
	componentWillMount(){
	}
	componentWillUnmount(){
		clearInterval(timer)
	}
	mouseIn = ()=>{
		clearInterval(timer)
	}
	mouseOut = ()=>{
		timer = this.interval(this.intervalTime)
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
			if(this.state.show){
				this.interval(this.intervalTime)
			} else {
				clearInterval(timer)
			}
		})
	}
	handleClick = (i,preIndex)=>{
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
			<div className = "nav_3d_scene" >
				<button 
					className = "nav_3d_btn"
					type = 'button'
					onClick = {this.changeShow}
					>{this.state.show?'↑':'↓'}</button>
				{<div 
					className = "nav_3d_container"
					style={{
						transform: `rotateY(${this.state.Ydeg}deg)`,
						top: `${!this.state.show?this.top:'0px'}`
					}}>
                    { data.map((n, i)=>{
                        return (
		                        <div
	                    			key={i+'nav3d'}
	                    			className = {`nav_3d_children ${i === currentIndex?"active":""}`}
	                                style = {{
	                                	transform: `rotateY(${!this.state.show?0:(360/data.length*i)}deg) 
	                                	translateZ(${!this.state.show?0:(56/Math.tan((2*Math.PI)/(2*data.length)))}px)`
	                                }}
	                                onClick = { this.handleClick.bind(this, i, Math.abs(currentIndex))}
	                                onMouseEnter = {this.mouseIn}
	                                onMouseLeave = {this.mouseOut}
	                                >
	                                {i === currentIndex?<a href={n.path}>{n.name}</a>:n.name}
		                        </div>
	                        )             
	                    }
                	)}
				</div>}
			</div>
		)
	}
}
nav3d.propTypes = {
	data: propTypes.array.isRequired,
	show: propTypes.bool,
	interval: propTypes.number,
	innerStyle: propTypes.object
}