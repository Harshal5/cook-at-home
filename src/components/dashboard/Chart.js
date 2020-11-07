import React from "react";
import { connect } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { fetchOrderDetails } from "../../redux/stockReducer/stockActions";

// Generate Sales Data
function createData(time, amount) {
	return { time, amount };
}

const data = [
	// createData("00:00", 0),
	// createData("03:00", 300),
	// createData("06:00", 500),
	// createData("09:00", 700),
	// createData("12:00", 1000),
];

export default function Chart({ orders }) {
	const theme = useTheme();
	console.log(orders);
	let data = []
	orders.map(({ order_time, bill }) => {
		data.push(createData(order_time, bill));
	});

	return (
		<React.Fragment>
			<Title>Today</Title>
			<ResponsiveContainer>
				<LineChart
					data={data}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}
				>
					<XAxis
						dataKey="time"
						stroke={theme.palette.text.secondary}
					/>
					<YAxis stroke={theme.palette.text.secondary}>
						<Label
							angle={270}
							position="left"
							style={{
								textAnchor: "middle",
								fill: theme.palette.text.primary,
							}}
						>
							Sales ($)
						</Label>
					</YAxis>
					<Line
						type="monotone"
						dataKey="amount"
						stroke={theme.palette.primary.main}
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
}
