import React from 'react';

class BreadCrumb extends React.Component {

constructor() {
 super();
}
render() {

  return <div><ol className="breadcrumb">
  <li className="breadcrumb-item active">Home</li>
</ol>
<ol className="breadcrumb">
  <li className="breadcrumb-item"><a href="#">Home</a></li>
  <li className="breadcrumb-item active">Library</li>
</ol>
<ol className="breadcrumb">
  <li className="breadcrumb-item"><a href="#">Home</a></li>
  <li className="breadcrumb-item"><a href="#">Library</a></li>
  <li className="breadcrumb-item active">Data</li>
</ol></div>
}

}

export default BreadCrumb;
