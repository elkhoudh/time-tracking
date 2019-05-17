import React, { PureComponent } from "react";
import { PieChart, Pie, Sector } from "recharts";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 4,
    flexGrow: 1,
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "88%",
      marginRight: 20,
      paddingLeft: "unset",
      margin: 20
    }
  },
  graphHeader: {
    fontSize: "1.2rem",
    marginBottom: "5px",
    fontWeight: 100,
    padding: "10px 0",
    borderBottom: "1px solid rgba(0, 0, 0, 0.15)"
  },
  graphsContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  }
});

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.description}
        {"\n"}
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.description} ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {(percent * 100).toFixed(2)}%
      </text>
    </g>
  );
};

class TimeChart extends PureComponent {
  state = {
    activeIndex: 0
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.graphsContainer}>
        <Paper className={classes.root} elevation={1}>
          <h2 className={classes.graphHeader}>Percentage of tasks done</h2>
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={this.props.data.map(t => {
                return { description: t.description, count: Number(t.count) };
              })}
              cx={200}
              cy={200}
              innerRadius={80}
              outerRadius={100}
              fill="#892785"
              dataKey="count"
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </Paper>
        <Paper className={classes.root} elevation={1}>
          <h2 className={classes.graphHeader}>Aggregation of time spent</h2>
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={this.props.timersList.map(t => {
                return {
                  description: t.description,
                  count: Number(t.percentageSpent)
                };
              })}
              cx={200}
              cy={200}
              innerRadius={80}
              outerRadius={100}
              fill="#892785"
              dataKey="count"
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(TimeChart);
