import React from 'react';
import { connect } from 'react-redux'
import BasicRxPanel from '../../../components/panels/BasicRxPanel';
import Utils from '../../../lib/react/utils';
import SaltFormulaModel from '../models/dbmodels/saltformulamodel'

import LabeledDropdown from '../../../components/LabeledDropdown';
import StandardListConverters from '../../../converters/StandardListConverters';
import  * as saltconfigurationActionCreator from '../redux/saltconfigurationactioncreators';



class StatetypeConfigurationPanel  extends BasicRxPanel {

  constructor() {
    super('SALT','STATETYPE_CONFIGURATIONPANEL')
    this.state = {
      saltformulas: [],
      selected_saltformula: SaltFormulaModel.emptySaltFormula(),
      selected_statetype: null,
    }

  }

  componentWillMount() {
    var {type} = this.props;
    this.props.dispatch(saltconfigurationActionCreator.loadAllSaltFormulas())
  }

  getSaltFormulabyId(id) {

    for(var i=0;i<this.state.saltformulas.length;i++) {
      if(this.state.saltformulas[i].getId() == id) {
        return this.state.saltformulas[i];
      }
    }
    return null;
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.type) {
      case 'SALT_CONFIGURATION_LOADED':
        this.getLogger().trace('saltformulas received')
        this.getLogger().traceObject(nextProps.saltformulas)
        this.props.dispatch(saltconfigurationActionCreator.loadCoupledSaltFormula(this.props.selectedStatetype))
        this.setState({saltformulas: nextProps.saltformulas})
        // load the selected statetype
        break;
      case 'UPDATE_SELECTED_SALT_FORMULA':
          var selected_saltformula = nextProps.selected_saltformula
          this.getLogger().trace('Updating salformula selector')
          this.getLogger().traceObject(selected_saltformula)
          this.setState({selected_saltformula: selected_saltformula})
        break;
      default:
    }

    switch (nextProps.statetype_type) {
      // called when the save button is pressed
      case 'UPDATE_STATETYPE_PLUGINS':
        var selected_saltformula = null
        if(typeof this.state.saltstate !== 'undefined') {
          selected_saltformula = this.getSaltFormulabyId(this.state.saltstate)
        }
        else {
          selected_saltformula = this.state.selected_saltformula
        }

        var selected_statetype = nextProps.selected_statetype
        this.getLogger().trace('selected formula')
        this.getLogger().traceObject(selected_saltformula)
        this.getLogger().trace('selected statetype')
        this.getLogger().traceObject(selected_statetype)


        this.setState({selected_statetype: selected_statetype, selected_saltformula: selected_saltformula})

        if(selected_saltformula.getId() == null) {
          this.props.dispatch(saltconfigurationActionCreator.updateDone(this.selected_statetype))
        }
        else {
          this.props.dispatch(saltconfigurationActionCreator.coupleFormulaToStatetype(selected_saltformula.getId(),selected_statetype.id))
        }
        break;
      default:
    }

  }

  render() {
    var selected_value = this.state.selected_saltformula.getId()
    return <div className="row" >
    <LabeledDropdown id="saltstate" selectedValue={selected_value} errorHandler={(id,callee) => this.handleError(id,callee)} items={StandardListConverters.convertObjectListToDDS(this.state.saltformulas)} label="Salt State" col="col-md-3" labelcol="col-md-1" onChange={e => this.changeAttr(e)}/>
    </div>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._saltstatetypes.type,
    statetype_type: state._statetypes.type,
    selected_statetype: state._statetypes.statetype,
    selected_saltformula: state._saltstatetypes.selected_saltformula,
    saltformulas: state._saltstatetypes.saltformulas
  }
}

const ConnectedStatetypeConfigurationPanel = connect(mapStateToProps)(StatetypeConfigurationPanel)

export default ConnectedStatetypeConfigurationPanel;
