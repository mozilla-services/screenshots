const React = require("react");

exports.TimeDiff = class TimeDiff extends React.Component {
  constructor(props) {
    super(props);
    this.state = { useLocalTime: false };
  }

  render() {
    let timeDiff;
    if (this.state.useLocalTime) {
      timeDiff = this.makeDiffString(this.props.date);
    } else {
      timeDiff = this.dateString(this.props.date);
    }
    return <span title={this.dateString(this.props.date)}>{timeDiff}</span>;
  }

  componentDidMount() {
    if (typeof window !== "undefined" && !this.state.useLocalTime) {
      setTimeout(() => {
        this.setState({ useLocalTime: true });
      });
    }
  }

  makeDiffString(d) {
    let timeDiff;
    let seconds = (Date.now() - d) / 1000;
    if (seconds > 0) {
      if (seconds < 20) {
        timeDiff = "just now";
      } else if (seconds > 0 && seconds < 60) {
        timeDiff = "1 minute ago";
      } else if (seconds < 60 * 60) {
        timeDiff = `${Math.floor(seconds / 60)} minutes ago`;
      } else if (seconds < 60 * 60 * 24) {
        timeDiff = `${Math.floor(seconds / (60 * 60))} hours ago`;
      } else if (seconds < 60 * 60 * 48) {
        timeDiff = "yesterday";
      } else if (seconds > 0) {
        seconds += 60 * 60 * 2; // 2 hours fudge time
        timeDiff = `${Math.floor(seconds / (60 * 60 * 24))} days ago`;
      }
    } else {
      if (seconds > -20) {
        timeDiff = "very soon";
      } else if (seconds > -60) {
        timeDiff = "in 1 minute";
      } else if (seconds > (-60) * 60) {
        timeDiff = `in ${Math.floor(seconds / (-60))} minutes`;
      } else if (seconds > (-60) * 60 * 24) {
        timeDiff = `in ${Math.floor(seconds / ((-60) * 60))} hours`;
      } else if (seconds > (-60) * 60 * 48) {
        timeDiff = "tomorrow";
      } else {
        seconds -= 60 * 60 * 2; // 2 hours fudge time
        timeDiff = `in ${Math.floor(seconds / ((-60) * 60 * 24))} days`;
      }
    }
    return timeDiff;
  }

  dateString(d) {
    let dYear, dMonth, dDay, dHour;
    if (!(d instanceof Date)) {
      d = new Date(d);
    }
    if (this.state.useLocalTime) {
      dYear = d.getFullYear();
      dMonth = d.getMonth();
      dDay = d.getDate();
      dHour = d.getHours();
    } else {
      dYear = d.getUTCFullYear();
      dMonth = d.getUTCMonth();
      dDay = d.getUTCDate();
      dHour = d.getUTCHours();
    }
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[dMonth];
    let hour;
    if (dHour === 0) {
      hour = "12am";
    } else if (dHour === 12) {
      hour = "12pm";
    } else if (dHour > 12) {
      hour = dHour % 12 + "pm";
    } else {
      hour = dHour + "am";
    }
    return `${month} ${dDay} ${dYear}, ${hour}`;
  }
};

exports.intervalDescription = function(ms) {
  let parts = [];
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;
  if (ms > day) {
    let days = Math.floor(ms / day);
    if (days === 1) {
      parts.push("1 day");
    } else {
      parts.push(`${days} days`);
    }
    ms = ms % day;
  }
  if (ms > hour) {
    let hours = Math.floor(ms / hour);
    if (hours === 1) {
      parts.push("1 hour");
    } else {
      parts.push(`{$hours} hours`);
    }
    ms = ms % hour;
  }
  if (ms > minute) {
    let minutes = Math.floor(ms / minute);
    if (minutes === 1) {
      parts.push("1 minute");
    } else {
      parts.push(`${minutes} minutes`);
    }
    ms = ms % minute;
  }
  if (ms) {
    let seconds = Math.floor(ms / second);
    if (seconds === 1) {
      parts.push("1 second");
    } else {
      parts.push(`${seconds} seconds`);
    }
  }
  if (!parts.length) {
    parts.push("immediately");
  }
  return parts.join(" ");
};
