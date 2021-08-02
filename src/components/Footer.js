import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Input from './Input';

const Footer = ({rows,cols,updateRows, updateCols,totalFilled,totalEmpty,totalIslands}) => {
    return (
        <Row> 
            <Col md></Col>
            <Col>
                <Input name="cols"
                     label="Current Cols"
                     value={cols} 
                     onChangeFunc={updateCols}>
                </Input>
            </Col>
            <Col xs md={4}>
                <Row> 
                <Col md className="cell-label">
                    <p className="cell-empty-label">&nbsp;Empty Cells&nbsp;</p>
                    <p className="cell-empty-label cell-total-label">{totalEmpty}</p>
                </Col>
                
                <Col md className="cell-label">
                    <p className="cell-filled-label">Total Islands</p>
                    <p className="cell-filled-label cell-total-label">{totalIslands}</p>
                </Col>
                </Row>
            </Col>
            <Col>
                <Input name="rows"
                     label="Current Rows"
                     value={rows} 
                     onChangeFunc={updateRows}>
                </Input>
            </Col>
            <Col md></Col>
        </Row>
    )
}

export default Footer
