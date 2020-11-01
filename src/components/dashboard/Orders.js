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
	componentDidMount() {
		this.props.fetchStockDetails();
	}

	render() {
		const { classes, stock } = this.props;
		let srNo = 1;
		return (
			<React.Fragment>
				<Title>Stock</Title>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Sr No</TableCell>
							<TableCell>Name</TableCell>
							{/* <TableCell>Ship To</TableCell> */}
							{/* <TableCell>Payment Method</TableCell> */}
							<TableCell align="right">Quantity</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{stock.loaded === true &&
							stock.data.map((row) => (
								<TableRow key={row.ingredient_id}>
									<TableCell>{row.ingredient_id}</TableCell>
									<TableCell>{row.ingredient_name}</TableCell>
									{/* <TableCell>{row.shipTo}</TableCell> */}
									{/* <TableCell>{row.paymentMethod}</TableCell> */}
									<TableCell align="right">
										<Icon
											className="fa fa-minus-circle"
											color="primary"
										/>
										{row.quantity_available}
										<Icon
											className="fa fa-plus-circle"
											color="primary"
										/>
									</TableCell>
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
