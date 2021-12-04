import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containHeader: {
		paddingTop: '4%',
		paddingBottom: '4%'
	},
	containDrawerOption: {
		paddingLeft: '6%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: '1%',
		paddingBottom: '5%',
		backgroundColor: '#e6e6e6',
	},
	headerText: {
		textAlign: 'center',
		fontFamily: 'sans-serif-medium',
		fontWeight: '600',
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 50
	},
	actionText: {
		textAlign: 'center',
		fontFamily: 'sans-serif-medium',
		fontWeight: '600',
		marginRight: '3%',
		marginLeft: '3%',
	},
	closeBtn: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 17,
	},
	closeText: {
		fontFamily: 'sans-serif-medium',
		fontWeight: '600',
		marginRight: '3%',
		marginLeft: '3%',
	}
});