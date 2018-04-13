const React = require("react");
const { Localized } = require("fluent-react/compat");
const PropTypes = require("prop-types");

exports.TimeDiff = class TimeDiff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {useLocalTime: false};
  }

  render() {
    let timeDiff;
    if (this.state.useLocalTime) {
      timeDiff = this.makeDiffString(this.props.date);
    } else {
      timeDiff = this.dateString(this.props.date);
    }
    return <Localized id={timeDiff.l10nID} $number={this.state.useLocalTime ? parseInt(timeDiff.diff, 10) : timeDiff.diff}><span title={this.dateString(this.props.date)}></span></Localized>
  }

  componentDidMount() {
    if (typeof window !== "undefined" && !this.state.useLocalTime) {
      setTimeout(() => {
        this.setState({useLocalTime: true});
      });
    }
  }

  makeDiffString(d) {
    let timeDiff;
    let l10nID;
    let seconds = (Date.now() - d) / 1000;
    if (seconds > 0) {
      if (seconds < 20) {
        l10nID = "timeDiffJustNow";
      } else if (seconds > 60 && seconds < 60 * 60) {
        l10nID = "timeDiffMinutesAgo";
        timeDiff = Math.floor(seconds / 60);
      } else if (seconds > 60 * 60 && seconds < 60 * 60 * 24) {
        l10nID = "timeDiffHoursAgo";
        timeDiff = Math.floor(seconds / (60 * 60));
      } else if (seconds > 60 * 60 * 24) {
        l10nID = "timeDiffDaysAgo";
        seconds += 60 * 60 * 2; // 2 hours fudge time
        timeDiff = Math.floor(seconds / (60 * 60 * 24));
      }
    } else if (seconds > -20) {
      l10nID = "timeDiffFutureSeconds";
    } else if (seconds > -60 * 60) {
      l10nID = "timeDiffFutureMinutes";
      timeDiff = Math.floor(seconds / -60);
    } else if (seconds > -60 * 60 * 24) {
      l10nID = "timeDiffFutureHours";
      timeDiff = Math.floor(seconds / (-60 * 60));
    } else {
      seconds -= 60 * 60 * 2; // 2 hours fudge time
      l10nID = "timeDiffFutureDays";
      timeDiff = Math.floor(seconds / (-60 * 60 * 24));
    }
    return {diff: timeDiff, l10nID};
  }

  dateString(d) {
    if (!this.state.useLocalTime) {
      return "";
    }
    if (!(d instanceof Date)) {
      d = new Date(d);
    }
    return d.toLocaleString();
  }
};

exports.TimeDiff.propTypes = {
  date: PropTypes.number
}
