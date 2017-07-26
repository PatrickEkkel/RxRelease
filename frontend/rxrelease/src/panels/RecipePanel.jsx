import React from 'react'
import DockerComposeConfiguration from '../plugins/docker_compose/DockerComposeConfiguration'

class  RecipePanel  extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <div><DockerComposeConfiguration/></div>
  }
}


export default RecipePanel;
