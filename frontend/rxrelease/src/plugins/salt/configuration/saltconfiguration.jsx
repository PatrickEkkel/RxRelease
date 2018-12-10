import React from 'react';
import { connect } from 'react-redux'
import YAMLEditor from '../../../components/YamlEditor'
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import NewFormulaPanel from './newSaltformula';
import StandardListConverters from '../../../converters/StandardListConverters'
import SaltFormulaModel from '../models/dbmodels/saltformulamodel'
import  * as saltconfigurationActionCreators from '../redux/saltconfigurationactioncreators'
import  * as yamlEditorActionCreator from '../../../redux/yamleditoractioncreator'


class SaltConfigurationPanel  extends BasicRxPanel {

  constructor() {
    super('SALT','CONFIGURATIONPANEL')
    this.state = {
      saltformulas_tabledata: [],
      saltformulas_modeldata: [],
      showModal: false,
      selected_formula: SaltFormulaModel.emptySaltFormula()
    }

  }
  changeYml(value) {
    var _selected_formula = this.state.selected_formula
    _selected_formula.file = value
    this.setState({selected_formula: _selected_formula})

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
      case 'SELECT_SALT_FORMULA':
      case 'SALT_CONFIGURATION_LOADED':
      case 'UPDATE_YAML_FILE':
      case 'SALT_FORMULA_SAVED':
      case 'SALT_FORMULA_UPDATED':
        this.props.dispatch(saltconfigurationActionCreators.initialConfigurationState())
        this.getLogger().trace("Reload configuration")
        break;
    }
  }
  componentWillReceiveProps(nextProps) {

    switch (nextProps.type) {
      case 'INITIAL_SALT_CONFIGURATION_STATE':
        this.getLogger().trace("Initial Salt Configuration State")
        this.props.dispatch(saltconfigurationActionCreators.loadAllSaltFormulas())
       break;
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
       this.props.dispatch(yamlEditorActionCreator.loadYamlFile(nextProps.selected_formula.getFile()))
       break;
      case 'OPEN_NEW_SALTFORMULA':
       this.setState({showModal: nextProps.showModal})
       break;
      case 'SALT_FORMULA_SAVED':
       this.setState({showModal: nextProps.showModal })
       this.props.dispatch(saltconfigurationActionCreators.loadAllSaltFormulas())
       break;
      case 'UPDATE_YAML_FILE':
        var _selected_formula = this.state.selected_formula
        _selected_formula.file = nextProps.yaml_contents
        this.setState({selected_formula: _selected_formula })
        break;
      default:

    }
  }

  saveAndClose() {
    var saltformula = SaltFormulaModel.newSaltFormula(null,this.state.formula_name,"#salt formula","NA")
    this.props.dispatch(saltconfigurationActionCreators.saveNewFormula(saltformula))
  }
  close() {
    this.props.dispatch(saltconfigurationActionCreators.initialConfigurationState())
  }
  createFormula() {
    this.props.dispatch(saltconfigurationActionCreators.openNewFormula())
  }
  saveFormula() {
    this.getLogger().trace("Current formula to be saved")
    this.getLogger().traceObject(this.state.selected_formula)
    this.props.dispatch(saltconfigurationActionCreators.updateFormula(this.state.selected_formula))
  }

  testSaltFormula() {
    alert('test!')
  }

  render() {
    var headers = ['','','']

    var data = this.state.saltformulas_tabledata
    var selected_formula = this.state.selected_formula
    var code = selected_formula.file

    this.getLogger().trace("Selected formula: ")
    this.getLogger().traceObject(selected_formula)
    return <div className="tab-content container form-group row">
              <div className="container" >
                        <Modal title="New Salt Formula" saveAndClose={() => this.saveAndClose()} close={() => this.close()} showModal={this.state.showModal}>
                        <NewFormulaPanel changeAttr={(e) => this.changeAttr(e)}/>
                        </Modal>
                <div className="row">
                  <div className="col-md-1">&nbsp;</div>
                </div>
                <div className="row">
                 <div className="col-md-1">&nbsp;</div>
                 <div className="col-md-6"><h5><b>salt-formula</b>:&nbsp; <i>{this.state.selected_formula.getName()}</i></h5></div>
                 <div className="col-md-2"></div>
                 <div className="col-md-2"><b><span className="pull-left">Formulas</span></b></div>
                </div>
                <div className="row h-100">
                  <div className="col-md-1">
                  </div>
                  <div className="col-md-8 h-100">
                      <YAMLEditor code={code} changeAttr={(e) => this.changeYml(e)}/>
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
                <div className="col-md-2 text-right"></div>
                <div className="col-md-3 text-left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className="col-md-4 text-right">
                  <Button title="Test Formula" css="btn btn-success" onClick={() => this.testSaltFormula()}/>&nbsp;
                  <Button title="New Formula" onClick={() => this.createFormula()}/>&nbsp;
                  <Button title="Save Formula" onClick={() => this.saveFormula()}/>  </div>
               </div>
             </div>
            </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._saltconfiguration.type,
    yaml_contents: state._saltconfiguration.yaml_contents,
    saltformulas: state._saltconfiguration.saltformulas,
    selected_formula: state._saltconfiguration.selected_formula,
    showModal: state._saltconfiguration.showModal
  }
}

const ConnectedSaltConfigurationPanel = connect(mapStateToProps)(SaltConfigurationPanel)

export default ConnectedSaltConfigurationPanel;
