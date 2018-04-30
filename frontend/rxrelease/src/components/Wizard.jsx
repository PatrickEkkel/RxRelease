import React from 'react'
import { connect } from 'react-redux'
import BasicRxComponentPanel from './panels/BasicRxComponentPanel';
import  * as wizardActionCreators from '../redux/wizardactioncreators'
import Button from '../components/Button'

class Wizard extends BasicRxComponentPanel {


  getItems() {
    return this.props.items;
  }
  onClickTab(id) {
    this.setState({selectedTab: id})
  }
  onClickNext() {
    this.props.dispatch(wizardActionCreators.loadNextWizardItem())
  }
  onclickPrevious() {
    this.props.dispatch(wizardActionCreators.loadPreviousWizardItem())
  }
  loadNextWizardItem() {
    var scoopNext = false;
    var currentSelectedTab = this.state.selectedTab;
      // search for the current and set the next as the selected step
      for(var key in this.getItems()) {

        if(scoopNext) {
          var newTabindex = this.state.selectedTabIndex + 1;
          this.setState({selectedTab: key,selectedTabIndex: newTabindex })
        }
        // current selected item
        scoopNext = key == currentSelectedTab;
      }
  }
  loadPreviousWizardItem() {
    var scoopNext = false;
    var currentSelectedTab = this.state.selectedTab;
    var tabs = Object.keys(this.getItems()).reverse();
      // search for the current and set the next as the selected step
      for(var i=0;i<tabs.length;i++) {
        if(scoopNext) {
          var newTabindex = this.state.selectedTabIndex - 1;
          this.setState({selectedTab: tabs[i],selectedTabIndex: newTabindex })
        }
        // current selected item
        scoopNext = tabs[i] == currentSelectedTab;
      }

  }

  componentWillMount() {
    var {type} = this.props;
    var selectedTab =   Object.keys(this.getItems())[0];
    var selectedTabContents  = Object.values(this.getItems())[0]
    var selectedTabIndex = 0;

    this.setState({
      selectedTab: selectedTab,
      selectedTabContents: selectedTabContents,
      selectedTabIndex: selectedTabIndex
    })
  }

  componentWillReceiveProps(nextProps) {
    var type = nextProps.type;
    var data = nextProps.data;


    if(type == 'LOAD_NEXT_WIZARD_ITEM') {
      this.loadNextWizardItem()
    }
    else if(type == 'LOAD_PREVIOUS_WIZARD_ITEM') {
      this.loadPreviousWizardItem()
    }
    else if(type == 'STORE_WIZARD_DATA') {
      console.log(this.state.selectedTabIndex)
    }
  }

  renderTab(entry) {
    var className = "nav-item"
    if(entry == this.state.selectedTab) {
      className += " active"
    }

    return <li role="presentation" className={className}  key={entry}>
          <a href="#step1" className="nav-link" data-toggle="tab"  aria-controls="step1" role="tab" title={entry}  onClick={() => this.onClickTab(entry)}>
                  {entry}
              </a>
      </li>


  }
  renderContents(key,value) {
    var className = "tab-pane"
    if(key == this.state.selectedTab) {
      className = " active"
    }
    return <div className={className}>
      {value}
    </div>
  }
  render() {
      var tabs = [];
      var tabContent = [];


      for(var key in this.getItems()){
        var value = this.getItems()[key];
        tabs.push(key)
        tabContent.push(this.renderContents(key,this.getItems()[key]))
        /* use key/value for intended purpose */
      }
    return <div className="container">
            <section>
                <ul className="nav nav-tabs" role="tablist">
                  { tabs.map(entry => this.renderTab(entry)) }
                </ul>
                  <div className="tab-content container form-group row">
                    {tabContent}
                  </div>

            </section>
            <div className="btn-group  ">
              { this.state.selectedTabIndex  > 0   ? (<Button css="btn btn-primary" title="Previous" onClick={() => this.onclickPrevious()}/>) : (<div/>) }
            <Button css="btn btn-primary " title="Next" onClick={() => this.onClickNext()}/>
            </div>
            <div className="clearfix"></div>
    </div>

  }
}

// This is our select function that will extract from the state the data slice we want to expose
// through props to our component.
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._wizard.type,
    data: state._wizard.data,
    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}
const ConnectedWizard = connect(mapStateToProps)(Wizard)

export default ConnectedWizard
