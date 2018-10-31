import React from 'react';
import { connect } from 'react-redux'
import YAMLEditor from '../../components/YamlEditor'
import Table from '../../components/Table';

class ConfigurationPanel  extends React.Component {


  constructor() {
    super()

  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }
  updateCode() {

  }
  onClickTab(name) {

  }
  onRowClick() {

  }
  render() {
      var headers = ['','']
      var data = [['docker-ce','GREEN'],['utils','RED'],['test','GREEN']]
      //return <div> <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} /></div>
      return <div className="container">
        <section>
         <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item active" role="presentation">
            <a href="#step1" className="nav-link" data-toggle="tab"  aria-controls="step1" role="tab" title="Menu1"  onClick={() => this.onClickTab("")}>Menu 1</a>

          </li>
        <li><a href="#">Menu 2</a></li>
        </ul>
        </section>
        <div className="tab-content container form-group row">
          <div className="container" >
            <div className="row">
              <div className="col-md-1">&nbsp;</div>
            </div>
            <div className="row no-gutters">
             <div className="col-md-1">&nbsp;</div>
             <div className="col-md-8"><h5><b>salt-formula</b>:&nbsp; <i>example-formula.sls*</i></h5></div>
             <div className="col-md-2"><b><span className="pull-left">Formulas</span></b></div>
            </div>
            <div className="row h-100">
              <div className="col-md-1">
              </div>
              <div className="col-md-8 h-100">
                  <YAMLEditor/>
              </div>
              <div className="col">
                  <Table headers = {headers} data={data} onRowClick={(entry) => this.onRowClick(entry)}/>
              </div>
            </div>
         </div>
        </div>
     </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._configuration.type,
  }
}

const ConnectedConfigurationPanel = connect(mapStateToProps)(ConfigurationPanel)

export default ConnectedConfigurationPanel;
