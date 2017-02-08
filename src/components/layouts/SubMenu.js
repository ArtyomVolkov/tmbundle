/**
 * Created by Artem_Volkov on 05-Jan-17.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Drawer from 'react-native-drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import SideMenu from './../layouts/SideMenu';

// styles
const drawerStyles = {
	drawer: {
		backgroundColor: '#f2f2f2',
		shadowColor: 'black',
		shadowOpacity: 0.9,
		shadowRadius: 3,
		borderRightWidth: 2,
		borderColor: '#a5a5a5'
	},
	main: {paddingLeft: 0}
};

class SubMenu extends Component {
	constructor(props) {
		super(props);
	}

	onOpenSubMenu =()=> {
		const state = this.props.navigationState;
		Actions.refresh({key: state.key, open: true});
	};

	onCloseSubMenu =()=> {
		const state = this.props.navigationState;
		Actions.refresh({key: state.key, open: false})
	};
	
	render(){
		const {props} = this;
		const state = props.navigationState;
		const children = state.children;

		return (
			<Drawer styles={drawerStyles}
				ref="navigation"
				type="displace"
				open={state.open}
				onOpen={this.onOpenSubMenu}
				onClose={this.onCloseSubMenu}
				content={<SideMenu />}
				tapToClose={true}
				openDrawerOffset={0.11}
				panCloseMask={0.11}
				negotiatePan={true}
				tweenHandler={(ratio) => ({
					main: {opacity: Math.max(0.54, 1 -ratio)}}
				)}
			>
				<DefaultRenderer navigationState={children[0]} onNavigate={props.onNavigate} />
			</Drawer>
		)
	}
}

export default SubMenu;
