import { useState, useEffect } from 'react';
import Grid from './components/Grid.js'
import Footer from './components/Footer.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { searchParentsGrid, processIslands } from './utils/commonUtils.js';

import './App.css';

function App() {
  const [cell, setCell] = useState([
    {
      id: null,
      state: null,
      color: null,
      island: null,
      parent: null
    }
  ]);

  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(15);
  const [grid, setGrid] = useState([]);

  const [totalFilled, setTotalFilled] = useState(0);
  const [totalEmpty, setTotalEmpty] = useState(0);
  const [totalIslands, setTotalIslands] = useState(0);

  useEffect(() => {
    const createGrid = () => {
      const arr = new Array(rows);
      let countEmpty = 0;
      for (var i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
          const newCell = { ...cell };
          arr[i][j] = newCell;
          arr[i][j].id = i + "_" + j;
          countEmpty++;
        }
      }
      setTotalEmpty(countEmpty);
      setGrid(arr);
      console.log(arr);
    }

    createGrid();

  }, [rows, cols])

  useEffect(() => {  
  }, [totalIslands])

  //Toggle cell
  const toggleCell = (id) => {

    //get current cell data
    const currentCell = getCurrentCell(id);

    //search parents data
    const searchParents = searchParentsGrid(grid, rows, cols, id);
    const countParents = searchParents.countParents;

    if (!currentCell.state) {
      //update counters
      setTotalFilled(totalFilled => totalFilled + 1);
      setTotalEmpty(totalEmpty => totalEmpty - 1);

    } else {
      //update counters
      setTotalEmpty(totalEmpty => totalEmpty + 1);
      setTotalFilled(totalFilled => totalFilled - 1);
    }

    //the magic behind the countIsland
    const process = processIslands(currentCell, searchParents, grid);

    //update island counter
    setTotalIslands(totalIsland => totalIsland + process.addParent + process.addIsland);

    //update grid with currentCell + parents
    setGrid(grid.map((rows) =>
      rows.map((cols) =>
        cols.id === id ? {
          ...cols,
          state: !cols.state,
          island: currentCell.id,
          parent: countParents > 0
        } : cols
      )
    ));

  }

  //get the cell with matching id
  const getCurrentCell = (id) => {
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        if (grid[i][j].id === id) {
          return grid[i][j];
        }
      }
    }
    return;
  }

  //Update Cols
  const updateCols = (event) => {
    event.preventDefault();
    const fieldValue = event.target.value;

    setCols(fieldValue);
    //createGrid();
  }

  //Update Rows
  const updateRows = (event) => {
    event.preventDefault();
    const fieldValue = event.target.value;

    setRows(fieldValue);
    //createGrid();
  }


  return (
    <Container>
      <Row>
        <Col>
          <Card border="info" className="card-main">
            <Card.Body>
              <Card.Title>
                <span className="cell-empty-label">TOGGLE &nbsp;</span>
                <span className="cell-filled-label">ISLAND</span>
              </Card.Title>
              <Card.Subtitle className="text-muted">Bisto Test</Card.Subtitle>
              <Grid gridInfo={grid} toggleCell={toggleCell}></Grid>
            </Card.Body>
            <Card.Footer>
              <Footer rows={rows} cols={cols}
                updateRows={updateRows}
                updateCols={updateCols}
                totalFilled={totalFilled}
                totalEmpty={totalEmpty}
                totalIslands={totalIslands}>
              </Footer>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
