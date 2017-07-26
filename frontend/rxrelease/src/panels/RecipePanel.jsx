import React from 'react'
import Button from '../components/Button'

class  RecipePanel  extends React.Component {
  constructor() {
    super()
  }

  render() {

    return <div>
      <div className="container">
      <div className="row">
        <div class="col-sm-9">
          <textarea className="form-control" rows="15"></textarea>
      </div>
      </div>
      <div className="row">
        <Button title="RAW"/>
        <Button title="Managed"/>
      </div>
      </div>


    </div>
  }
}


export default RecipePanel;
