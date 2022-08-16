import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import HistoryList from '../components/HistoryList'
import Chart from './Chart';

function HistoryTab({dataApi,search}) {
  return (
    <div className="container">
      {
        dataApi!=='no_data'?
        <Tabs
        defaultActiveKey="graph"
        id="uncontrolled-tab-example"
        >
      <Tab eventKey="graph" title={dataApi[0].companyName}>
    <Chart data={dataApi} search={search}></Chart>
      </Tab> 
     
    </Tabs>
      :''}
      </div>
  );
}

export default HistoryTab;