import React from "react";
// import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@material-ui/core/Icon";
import Title from "./Title";
import { fetchStockDetails } from "../../redux/stockReducer/stockActions";

function preventDefault(event) {
	event.preventDefault();
}

const styles = (theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
});

class Orders extends React.Component {
	render() {
		const { classes, orders } = this.props;
		let srNo = 1;
		return (
			<React.Fragment>
				<Title>Order Details</Title>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Sr No</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Time</TableCell>
							<TableCell align="right">Payment</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((row) => (
							<TableRow key={row.order_id}>
								<TableCell>{row.order_id}</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.order_time}</TableCell>
								<TableCell align="right">{row.bill}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<div className={classes.seeMore}>
					<Link color="primary" href="#" onClick={preventDefault}>
						See more items
					</Link>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		stock: state.stock,
	};
};

export default withStyles(styles, { withTheme: true })(
	withRouter(
		connect(mapStateToProps, {
			fetchStockDetails,
		})(Orders)
	)
);
