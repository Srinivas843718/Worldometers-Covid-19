import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import * as d3Format from 'd3-format';
import { scaleBand } from '@devexpress/dx-chart-core';
import {
  ArgumentScale, Stack, Animation, EventTracker,  SelectionState,
} from '@devexpress/dx-react-chart';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {
  NavigateBefore, NavigateNext,
} from '@material-ui/icons/';
import Typography from '@material-ui/core/Typography';

import { annualVehiclesSales as data } from './data-vizualization';

const styles = theme => ({
  primaryButton: {
    margin: theme.spacing(1),
    width: '120px',
  },
  secondaryButton: {
    margin: theme.spacing(1),
    width: '170px',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    marginBottom: '1px',
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    marginBottom: '1px',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
//   hoverGroup: {
//     width: '300px',
//   },
  name: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

const tooltipContentTitleStyle = {
  fontWeight: 'bold',
  paddingBottom: 0,
};
const tooltipContentBodyStyle = {
  paddingTop: 0,
};
const formatTooltip = d3Format.format(',.2r');
const TooltipContent = (props) => {
  const { targetItem, text, ...restProps } = props;
  return (
    <div >
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentTitleStyle}
          text={targetItem.series}
        />
      </div>
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentBodyStyle}
          text={formatTooltip(data[targetItem.point][targetItem.series])}
        />
      </div>
    </div>
  );
};
const Root = withStyles({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
})(({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
));
const Label = withStyles({
  label: {
    whiteSpace: 'nowrap',
  },
})(({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
));

const TitleText = withStyles({ title: { marginBottom: '30px',color:'blue',fontFamily:'Lucida Calligraphy' } })(({ classes, ...restProps }) => (
  <Title.Text {...restProps} className={classes.title} />
));

const formatInfo = (target) => {
  if (!target) {
    return 'None';
  }
  const { series, point } = target;
  const value = data[point][series];
  const argument = data[point].year;
  return ` ${value} ${series} cases in ${argument}`;
};

const AuxiliaryButton = props => (
  <Button variant="outlined" {...props} />
);

const AuxiliarySelection = ({
  classes, target, turnNext, turnPrev, clear,
}) => (
  <div>
    <div className={classes.group}>
      <AuxiliaryButton onClick={turnPrev} className={classes.primaryButton} color="primary">
        <NavigateBefore className={classes.leftIcon} />
        Previous
      </AuxiliaryButton>
      <AuxiliaryButton onClick={clear} className={classes.secondaryButton}>
        Clear Selection
      </AuxiliaryButton>
      <AuxiliaryButton onClick={turnNext} className={classes.primaryButton} color="primary">
        Next
        <NavigateNext className={classes.rightIcon} />
      </AuxiliaryButton>
    </div>
    <div className={classes.text}> 
      <Typography color="textSecondary" variant="body2" className={classes.name}>Selected:</Typography>
      <Typography>{formatInfo(target)}</Typography>
    </div>
  </div>
);

// const AuxiliaryHover = ({
//   classes, target, enabled, toggle,
// }) => (
//   <div className={classes.hoverGroup}>
//     <AuxiliaryButton onClick={toggle} className={classes.secondaryButton}>
//       {enabled ? 'Disable tooltip' : 'Enable tooltip'}
//     </AuxiliaryButton>
//     <div className={classes.text}>
//       <Typography color="textSecondary" variant="body2" className={classes.name}>Hovered:</Typography>
//       <Typography>{formatInfo(target)}</Typography>
//     </div>
//   </div>
// );

const encodeTarget = ({ series, point }) => (2 * point + Number(series === 'Recovered'));
const decodeTarget = code => ({ series: code % 2 ? 'Recovered' : 'Total', point: Math.floor(code / 2) });

const compareTargets = (
  { series, point }, { series: targetSeries, point: targetPoint },
) => series === targetSeries && point === targetPoint;

class Graphs extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      //hover: null,
      selection: [{ series: 'Total', point: 3 }],
      tooltipTarget: null,
      tooltipEnabled: true,
    };

    this.click = ({ targets }) => {
      const target = targets[0];
      if (target) {
        this.setState(({ selection }) => ({
          selection: selection[0] && compareTargets(selection[0], target) ? [] : [target],
        }));
      }
    };
   // this.changeHover = hover => this.setState({ hover });
    this.changeTooltip = targetItem => this.setState({ tooltipTarget: targetItem });

    this.clearSelection = () => this.setState({ selection: [] });
    this.turnPrevSelection = () => this.setState(({ selection }) => {
      const target = selection[0];
      if (!target) {
        return null;
      }
      const newTarget = decodeTarget(Math.max(encodeTarget(target) - 1, 0));
      return { selection: [newTarget] };
    });
    this.turnNextSelection = () => this.setState(({ selection }) => {
      const target = selection[0];
      if (!target) {
        return null;
      }
      const newTarget = decodeTarget(Math.min(encodeTarget(target) + 1, 2 * data.length - 1));
      return { selection: [newTarget] };
    });

    this.toggleTooltip = () => this.setState(({ tooltipEnabled }) => ({
      tooltipEnabled: !tooltipEnabled,
      tooltipTarget: null,
    }));
  }

  render() {
    const {
       selection, tooltipTarget, tooltipEnabled,
    } = this.state;
    const { classes } = this.props;

    return (
        <div className='container'>
      <Paper>
        <Chart
          data={data}
        >
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />

          {/* <Title
            text="Graphical view of Total and Recovered Cases in 15 Most affected Countries"
            textComponent={TitleText}
          /> */}

          <BarSeries
            name="Total"
            valueField="Total"
            argumentField="year"
          />
          <BarSeries
            name="Recovered"
            valueField="Recovered"
            argumentField="year"
          />
          <Stack />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <EventTracker onClick={this.click} />
          {/* <HoverState hover={hover} onHoverChange={this.changeHover} /> */}
          {/* <Tooltip
            targetItem={tooltipEnabled && tooltipTarget}
            onTargetItemChange={this.changeTooltip}
            contentComponent={TooltipContent}
          /> */}
          <SelectionState selection={selection} />
          <Animation />
        </Chart>
        <div className={classes.group}>
          {/* <AuxiliaryHover
            classes={classes}
            target={hover}
            enabled={tooltipEnabled}
            toggle={this.toggleTooltip}
          /> */}
          <AuxiliarySelection
            classes={classes}
            target={selection[0]}
            clear={this.clearSelection}
            turnPrev={this.turnPrevSelection}
            turnNext={this.turnNextSelection}
          />
        </div>
      </Paper>
      <br />
      </div>
    );
  }
}

export default withStyles(styles)(Graphs);
