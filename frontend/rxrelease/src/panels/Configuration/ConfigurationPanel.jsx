import React from 'react';
import { connect } from 'react-redux'
import * as plugincatalog from '../../plugins/plugincatalog'
import BasicRxPanel from '../../components/panels/BasicRxPanel';

class ConfigurationPanel  extends BasicRxPanel {


  constructor() {
    super('CONFIGURATION','TABPANEL')
      this.state  = {selectedTab: 'Salt'}
  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }
  updateCode() {

  }
  onClickTab(id) {
    this.setState({selectedTab: id})
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
    return <div key={key} className={className}>
      {value}
    </div>
  }

  render() {
      var tabs = ['Salt','Test']
      var tabContent = []

      var module = plugincatalog._modules('Salt')
      tabContent.push(this.renderContents('Salt',module.getPanel('SALT_CONFIGURATION_PANEL')))

      return <div className="container">
        <section>
         <ul className="nav nav-tabs" role="tablist">
        { tabs.map(entry => this.renderTab(entry)) }
        </ul>
        </section>
        <div className="tab-content container form-group row">
          {tabContent}
        </div>

     </div>
  }
}
// TODO: dit is niet helemaal correct denk ik, connection hier weg halen als we die niet nodig blijken te hebben

//const mapStateToProps = (state/*, props*/) => {
//  return {
//    type: state._plugin._saltconfiguration.type,
//  }
//}

//const ConnectedConfigurationPanel = connect(mapStateToProps)(ConfigurationPanel)

export default ConfigurationPanel;
