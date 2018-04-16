import React from 'react'
import { connect } from 'react-redux'
import BasicRxComponentPanel from './panels/BasicRxComponentPanel';

class Wizard extends BasicRxComponentPanel {


  getItems() {
    return this.props.items;
  }
  onClickTab(id) {
    this.setState({selectedTab: id})
  }

  componentWillMount() {
    var {type} = this.props;
    var selectedTab =   Object.keys(this.getItems())[0];
    var selectedTabContents  = Object.values(this.getItems())[0]

    this.setState({
      selectedTab: selectedTab,
      selectedTabContents: selectedTabContents
    })


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
        <div className="row">
            <section>

                <ul className="nav nav-tabs" role="tablist">
                  { tabs.map(entry => this.renderTab(entry)) }
                </ul>

                <form role="form">
                  <div className="tab-content">
                    {tabContent}
                  <div className="clearfix"></div>
                  </div>
                </form>
            </section>
        </div>
    </div>

  }
}

export default Wizard
