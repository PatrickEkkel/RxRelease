import React from 'react';
import { connect } from 'react-redux'
import YAMLEditor from '../../../components/YamlEditor'
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import StandardListConverters from '../../../converters/StandardListConverters'
import SaltFormulaModel from '../models/dbmodels/saltformulamodel'
import  * as saltconfigurationActionCreators from '../redux/saltconfigurationactioncreators'


class SaltConfigurationPanel  extends BasicRxPanel {

  constructor() {
    super('SALT','CONFIGURATIONPANEL')
    this.state = {
      saltformulas_tabledata: [],
      saltformulas_modeldata: [],
      selected_formula: SaltFormulaModel.emptySaltFormula()
    }

  }

  onRowClick(entry) {
   var formula_id = entry[0]
   var _selected_salt_formula = this.state.saltformulas_modeldata.filter(function(x) { return x.getId() == formula_id})[0]
   this.props.dispatch(saltconfigurationActionCreators.switchSaltformula(_selected_salt_formula))
  }

  componentWillMount() {

    var {type} = this.props;
    //this.props.dispatch(saltconfigurationActionCreators.initialConfigurationState())
    switch (type) {
      case 'INITIAL_SALT_CONFIGURATION_STATE':
        this.props.dispatch(saltconfigurationActionCreators.loadAllSaltFormulas())
        break;
      default:

    }
  }
  componentWillReceiveProps(nextProps) {

    switch (nextProps.type) {
      case 'SALT_CONFIGURATION_LOADED':
        this.getLogger().trace("recieved Saltformulas")
        this.getLogger().traceObject(nextProps.saltformulas)

        var data = StandardListConverters.convertListToMap(nextProps.saltformulas,function(item) {
          return [item.getId(),item.getName(),item.getStatus()]
        });
        this.getLogger().trace("tabledata saltformulas")
        this.getLogger().traceObject(data)
        this.setState({
           saltformulas_tabledata: data,
           saltformulas_modeldata: nextProps.saltformulas }
         )
        break;
      case 'SELECT_SALT_FORMULA':
       this.setState({selected_formula: nextProps.selected_formula})
       break;
      default:

    }
  }

  render() {
    var headers = ['','','']
    //var data = [['docker-ce','GREEN'],['utils','RED'],['test','GREEN']]
    var data = this.state.saltformulas_tabledata
    var selected_formula = this.state.selected_formula
    var code = selected_formula.file
    //alert(code)
    this.getLogger().trace("Selected formula: ")
    this.getLogger().traceObject(selected_formula)
    return <div className="tab-content container form-group row">
              <div className="container" >
                <div className="row">
                  <div className="col-md-1">&nbsp;</div>
                </div>
                <div className="row">
                 <div className="col-md-1">&nbsp;</div>
                 <div className="col-md-8"><h5><b>salt-formula</b>:&nbsp; <i>example-formula.sls*</i></h5></div>
                 <div className="col-md-2"><b><span className="pull-left">Formulas</span></b></div>
                </div>
                <div className="row h-100">
                  <div className="col-md-1">
                  </div>
                  <div className="col-md-8 h-100">
                      <YAMLEditor code={code}/>
                  </div>
                  <div className="col">
                      <Table headers = {headers} data={data} onRowClick={(entry) => this.onRowClick(entry)}/>
                  </div>
                </div>
                <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-8 padding-top p-4"></div>
                </div>
             </div>
             <div className="container no-gutters">
               <div className="row"><div className="col-md-1">&nbsp;</div></div>
               <div className="row ">
                <div className="col-md-1">&nbsp;</div>
                <div className="col-md-6 text-left">&nbsp;&nbsp;&nbsp;&nbsp;<Button title="New Formula"/>&nbsp;</div>
                <div className="col-md-2 text-right">&nbsp;<Button title="Save Formula"/></div>
               </div>
             </div>
            </div>
  }
}



const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._saltconfiguration.type,
    saltformulas: state._saltconfiguration.saltformulas,
    selected_formula: state._saltconfiguration.selected_formula
  }
}

const ConnectedSaltConfigurationPanel = connect(mapStateToProps)(SaltConfigurationPanel)

export default ConnectedSaltConfigurationPanel;
