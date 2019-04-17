import React from 'react';
import { connect } from 'react-redux'
import YAMLEditor from '../../../components/YamlEditor'
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import NewFormulaPanel from './newSaltformula';
import NewSaltFilePanel from './newSaltFile';
import StandardListConverters from '../../../converters/StandardListConverters';
import GlobalSettings from '../../../config/global'
import FileModel from '../../../models/dbmodels/filemodel'
import SaltFormulaModel from '../models/dbmodels/saltformulamodel';
import  * as saltconfigurationActionCreators from '../redux/saltconfigurationactioncreators';
import  * as fileActionCreators from '../../../redux/fileactionscreator';
import  * as yamlEditorActionCreator from '../../../redux/yamleditoractioncreator';


class SaltConfigurationPanel  extends BasicRxPanel {

  constructor() {
    super('SALT','CONFIGURATIONPANEL')
    this.state = {
      salt_formula_tabledata: [],
      salt_file_tabledata: [],
      salt_formula_modeldata: [],
      salt_formula_filedata: [],
      showSaltModal: false,
      showFileModal: false,
      selected_formula: SaltFormulaModel.emptySaltFormula(),
      selected_file: null,
      contents: null
    }

  }

  saveAndCloseNewSaltFormula() {
    var saltformula = SaltFormulaModel.newSaltFormula(null,this.state.formula_name,"#salt formula","NA")
    this.props.dispatch(saltconfigurationActionCreators.saveNewFormula(saltformula))
  }

  savenAndCloseNewFile() {
    // NOTE: possible improvement is to get the localstore path from the backend, rather than getting it from global.js
    var path = new GlobalSettings().LOCAL_SALT_STORE + '/' + this.state.selected_formula.getName()
    var file = FileModel.newFile(null,this.state.file_name,path)
    this.props.dispatch(saltconfigurationActionCreators.saveNewFile(file,this.state.selected_formula))
  }

  changeYml(value) {
    var _selected_formula = this.state.selected_formula
    _selected_formula.file = value
    this.setState({selected_formula: _selected_formula})

  }

  onFileRowClick(entry) {
    var file_id = entry[0]
    var selected_formula = this.state.selected_formula
    var files = selected_formula.getFiles()
    var selected_file = files.filter(function(x) { return x.getId() == file_id})[0]
    this.getLogger().trace("selected file")
    this.getLogger().traceObject(selected_file)
    this.props.dispatch(fileActionCreators.getFileContents(selected_file))

  }

  onFormulaRowClick(entry) {
   var formula_id = entry[0]
   var _selected_salt_formula = this.state.saltformulas_modeldata.filter(function(x) { return x.getId() == formula_id})[0]
   this.props.dispatch(saltconfigurationActionCreators.switchSaltformula(_selected_salt_formula))
  }


  close() {
    this.props.dispatch(saltconfigurationActionCreators.initialConfigurationState())
  }
  createFile() {
    this.props.dispatch(saltconfigurationActionCreators.openNewFile())
  }
  createFormula() {
    this.props.dispatch(saltconfigurationActionCreators.openNewFormula())
  }
  saveFormula() {
      this.getLogger().trace('selected file to save')
      this.getLogger().traceObject(this.state.selected_file)
      this.props.dispatch(fileActionCreators.putFileContent(this.state.selected_file,this.state.contents))
  }

  testSaltFormula() {

      this.getLogger().trace('selected formula to test')
      this.getLogger().traceObject(this.state.selected_formula)
      var selected_formula = this.state.selected_formula
      this.props.dispatch(saltconfigurationActionCreators.testSaltFormula(selected_formula))

  }

  componentWillMount() {

    var {type} = this.props;
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
    this.getLogger().trace('currentstate:  ' + nextProps.type)
    switch (nextProps.type) {

      case 'FILE_CONTENTS_LOADED':
          this.getLogger().trace('recieved contents')
          this.getLogger().traceObject(nextProps.contents)
          this.getLogger().trace('file loaded')
          this.getLogger().traceObject(nextProps.selected_file)
          this.setState({contents: nextProps.contents,selected_file: nextProps.selected_file})
          this.props.dispatch(yamlEditorActionCreator.loadYamlFile(nextProps.contents))
          break;
      case 'INITIAL_SALT_CONFIGURATION_STATE':
          this.getLogger().trace("Initial Salt Configuration State")
          this.props.dispatch(saltconfigurationActionCreators.loadAllSaltFormulas())
          break;
      case 'SALT_CONFIGURATION_LOADED':
          this.getLogger().trace("recieved Saltformulas")
          this.getLogger().traceObject(nextProps.saltformulas)
          this.setState({showFileModal: false, showSaltModal: false})

          var data = StandardListConverters.convertListToMap(nextProps.saltformulas,function(item) {
              return [item.getId(),item.getName(),item.getStatus()]
          });
          this.getLogger().trace("tabledata saltformulas")
          this.getLogger().traceObject(data)
          this.setState({
              saltformulas_tabledata: data,
              saltformulas_modeldata: nextProps.saltformulas }
            )
          var selected_formula = null;
          if(this.state.selected_formula != null) {
            selected_formula = this.state.selected_formula
          }
          else if(nextProps.saltformulas.length > 0) {
            selected_formula = nextProps.saltformulas[0]
          }

          if(selected_formula != null) {
            this.props.dispatch(saltconfigurationActionCreators.switchSaltformula(this.state.selected_formula))
          }


          break;
      case 'SELECT_SALT_FORMULA':
          var files = nextProps.selected_formula.getFiles()
          var formula_files = StandardListConverters.convertListToMap(files,function(item) {
              return [item.getId(),item.getFilename(),item.getPath()]
          });
          this.getLogger().trace('selected formula: ')
          this.getLogger().traceObject(nextProps.selected_formula)
          this.setState({selected_formula: nextProps.selected_formula,salt_file_tabledata: formula_files})



       break;
      case 'OPEN_NEW_SALTFORMULA':
          this.setState({showSaltModal: nextProps.showModal})
       break;
      case 'OPEN_NEW_SALTFILE':
          this.setState({showFileModal: nextProps.showModal})
          break;
      case 'SALT_FORMULA_UPDATED':
          this.getLogger().trace('SALT_FORMULA_UPDATED selected formula')
          this.getLogger().traceObject(nextProps.updated_formula)
          this.getLogger().traceObject(nextProps.showModal)
          this.setState({showSaltModal: false,showFileModal: false,selected_formula: nextProps.updated_formula })
          this.props.dispatch(saltconfigurationActionCreators.loadAllSaltFormulas())
          break;
      case 'SALT_FILE_SAVED':
          this.getLogger().trace('SALT_FILE_SAVED selected formula')
          this.getLogger().traceObject(nextProps.selected_formula)

          var saltformula =  nextProps.selected_formula
          this.getLogger().trace('salt formula file')
          this.getLogger().traceObject(nextProps.file)

          this.getLogger().trace('updated fileslist')
          this.getLogger().traceObject(saltformula.getFiles())

          saltformula.addFile(nextProps.file)
          this.props.dispatch(saltconfigurationActionCreators.updateFormula(nextProps.selected_formula))
          break;
      case 'SALT_FORMULA_SAVED':
          this.setState({showSaltModal: nextProps.showModal,showFileModal: nextProps.showModal })
          this.props.dispatch(saltconfigurationActionCreators.loadAllSaltFormulas())
       break;
      case 'UPDATE_YAML_FILE':
            this.setState({contents: nextProps.yaml_contents})
          break;
      default:

    }
  }

  render() {
    var formulaHeaders = ['','','']
    var fileHeaders = ['']

    var formulas = this.state.saltformulas_tabledata
    var files = this.state.salt_file_tabledata
    var selected_formula = this.state.selected_formula
    var code = selected_formula.file

    this.getLogger().trace("Selected formula: ")
    this.getLogger().traceObject(selected_formula)
    return <div className="tab-content container form-group row">
              <div className="container" >
                        <Modal title="New Salt Formula" saveAndClose={() => this.saveAndCloseNewSaltFormula()} close={() => this.close()} showModal={this.state.showSaltModal}>
                          <NewFormulaPanel changeAttr={(e) => this.changeAttr(e)}/>
                        </Modal>
                        <Modal title="New Salt File" saveAndClose={() => this.savenAndCloseNewFile()} close={() => this.close()} showModal={this.state.showFileModal}>
                          <NewSaltFilePanel changeAttr={(e) => this.changeAttr(e)}/>
                        </Modal>
                <div className="row">
                  <div className="col-md-1">&nbsp;</div>
                </div>
                <div className="row">
                 <div className="col-md-2">
                  <span className="pull-right">
                   <Button title="-" onClick={() => this.testSaltFormula()}/>&nbsp;
                   <Button title="+" onClick={() => this.createFile()}/>&nbsp;
                  </span>
                 </div>
                </div>
                <div className="row">
                 <div className="col-md-2">
                  &nbsp;
                 </div>

                 <div className="col-md-6"><h5><b>salt-formula</b>:&nbsp; <i>{this.state.selected_formula.getName()}</i></h5></div>
                 <div className="col-md-2"></div>
                 <div className="col-md-2"><b><span className="pull-left">Formulas</span></b></div>
                </div>
                <div className="row h-100">
                  <div className="col-md-2">
                      <Table headers = {fileHeaders} data={files} onRowClick={(entry) => this.onFileRowClick(entry)}/>
                  </div>
                  <div className="col-md-8 h-100">
                      <YAMLEditor code={code} changeAttr={(e) => this.changeYml(e)}/>
                  </div>
                  <div className="col">
                      <Table headers = {formulaHeaders} data={formulas} onRowClick={(entry) => this.onFormulaRowClick(entry)}/>
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
    selected_file: state._saltconfiguration.selected_file,
    updated_formula: state._saltconfiguration.updated_formula,
    showModal: state._saltconfiguration.showModal,
    contents: state._saltconfiguration.contents,
    file: state._saltconfiguration.file
  }
}

const ConnectedSaltConfigurationPanel = connect(mapStateToProps)(SaltConfigurationPanel)

export default ConnectedSaltConfigurationPanel;
