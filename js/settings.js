S = {
    render: function() {
        ReactDOM.render(
            <SettingsPage data={STATUS.settings} />,
            document.getElementById('settings_sub_page')
        );
        S.updateTaskNB();
    },
    pushSettings: function() {
        S.pushSettingsHandler(STATUS.settings);
    },
    pushSettingsHandler: null,
    push: function() {
        S.pushSettings();
        S.updateTaskNB();
        BGC.updateActiveState();
    },
    updateTaskNB: function() {
        if (STATUS.settings.taskNB) {
            $("#bar_left").show();
            $("#bar_right").show();
        } else {
            $("#bar_left").hide();
            $("#bar_right").hide();
        }
    }
}

SettingsPage = React.createClass({
    getInitialState: function() {
        return { "data": this.props.data };
    },
    componentWillMount: function() {
        S.pushSettingsHandler = (data) => {
            this.setState({ "data": data })
        };
    },
    render: function() {
        return (
            <div id="settings_sub">
	        	<TaskNB val = {this.state.data.taskNB}/><br/>
                <ActiveBG val = {this.state.data.activeBG}/>
	        	<br/>
	        	<div>
	        		More features coming soon...<br/>
	        		Support us by <a href = 'https://chrome.google.com/webstore/detail/trailblazer/bgedjdgagndeglpacdndipmhhgboeehl/reviews' target="_blank" >leaving a review!</a>
	        	</div>
	        </div>
        )
    }
});

TaskNB = React.createClass({
    handleClickOn: function() {
        STATUS.settings.taskNB = true;
        N.saveAll();
        S.push();
    },
    handleClickOff: function() {
        STATUS.settings.taskNB = false;
        N.saveAll();
        S.push();
    },
    render: function() {
        var onButClass = this.props.val ? "onNow" : "offNow";
        var offButClass = !this.props.val ? "onNow" : "offNow";
        return (
            <div id = "tasksNB">
				<div>Tasks and Notebook</div>
				<div className = {"fade settingsB " + onButClass} onClick = {this.handleClickOn}>On</div>
				<div className = {"fade settingsB " + offButClass} onClick = {this.handleClickOff}>Off</div>
			</div>
        )
    }
})

ActiveBG = React.createClass({
    handleClickOn: function() {
        STATUS.settings.activeBG = true;
        storageSet();
        S.push();
    },
    handleClickOff: function() {
        STATUS.settings.activeBG = false;
        storageSet();
        S.push();
    },
    render: function() {
        var onButClass = this.props.val ? "onNow" : "offNow";
        var offButClass = !this.props.val ? "onNow" : "offNow";
        return (
            <div id = "activeBG">
                <div>Dynamic Background</div>
                <div className = {"fade settingsB " + onButClass} onClick = {this.handleClickOn}>On</div>
                <div className = {"fade settingsB " + offButClass} onClick = {this.handleClickOff}>Off</div>
            </div>
        )
    }
})