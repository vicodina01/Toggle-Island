import { useState, useEffect } from 'react';
import Grid from './components/Grid.js'
import Footer from './components/Footer.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

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
      const arr = new Array(cols);
      let countEmpty = 0;
      for (var i = 0; i < cols; i++) {
        arr[i] = new Array(rows);
        for (var j = 0; j < rows; j++) {
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
    console.log(totalIslands)
  }, [totalIslands])

  //Toggle cell
  const toggleCell = (id) => {
    let currentIsland;
    let haveParents = false;

    //get current cell data
    const currentCell = getCurrentCell(id);

    //search parents data
    const searchParents = searchParentsCell(id);
    const countParents = searchParents.countParents;

    const parentTop = searchParents.parentTop;
    const parentLeft = searchParents.parentLeft;
    const parentRight = searchParents.parentRight;
    const parentDown = searchParents.parentDown;


    if (!currentCell.state) {
      //update counters
      setTotalFilled(totalFilled => totalFilled + 1);
      setTotalEmpty(totalEmpty => totalEmpty - 1);

      //any parents available
      if (parentTop !== undefined || parentLeft !== undefined || 
          parentRight !== undefined || parentDown !== undefined) {

        if (countParents > 1) {
          //merge islands
          setTotalIslands(totalIslands => totalIslands - (countParents - 1));
        }

        //update parents  TO DO...
        if (parentTop !== undefined && !parentTop.parent) {
          updateParent(parentTop, currentCell);
        }

        currentIsland = currentCell.id;
        haveParents = true;

      } else {
        //set new island
        setTotalIslands(totalIslands => totalIslands + 1);
        currentIsland = currentCell.id;
      }

    } else {
      //update counters
      setTotalEmpty(totalEmpty => totalEmpty + 1);
      setTotalFilled(totalFilled => totalFilled - 1);

      //delete island
      currentIsland = null;
      if (parentTop === undefined &&
        parentLeft === undefined &&
        parentRight === undefined &&
        parentDown === undefined) {

        setTotalIslands(totalIslands => totalIslands - 1);
      }
    }

    //update grid with currentCell
    setGrid(grid.map((rows) =>
      rows.map((cols) =>
        cols.id === id ? {
          ...cols,
          state: !cols.state,
          island: currentIsland,
          parent: haveParents
        } : cols
      )
    ));

  }

  //get the cell with matching id
  const getCurrentCell = (id) => {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].id === id) {
          return grid[i][j];
        }
      }
    }
    return;
  }

  //get the parent cell with matching id
  const searchParentsCell = (id) => {
    let parentTop;
    let parentLeft;
    let parentRight;
    let parentDown;
    let countParents = 0;

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].id === id) {

          //search up
          if (grid[i][j - 1] !== undefined && grid[i][j - 1].state) {
            console.log("search up")
            parentTop = grid[i][j - 1];

            if (!parentTop.parent) {
              countParents++;
            }
          }
          //search left
          if (grid[i - 1][j] !== undefined && grid[i - 1][j].state) {
            console.log("search left")
            parentLeft = grid[i - 1][j];

            if (!parentLeft.parent) {
              countParents++;
            }
          }

          //search right
          if (grid[i + 1][j] !== undefined && grid[i + 1][j].state) {
            console.log("search right")
            parentRight = grid[i + 1][j];

            if (!parentRight.parent) {
              countParents++;
            }
          }

          //search down
          if (grid[i][j + 1] !== undefined && grid[i][j + 1].state) {
            console.log("search down")
            parentDown = grid[i][j + 1];

            if (!parentDown.parent) {
              countParents++;
            }
          }
        }
      }
    }

    return {
      countParents,
      parentTop,
      parentLeft,
      parentRight,
      parentDown
    };
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

  //Update Parents
  const updateParent = (parent, currentCell) => {
    console.log("updateParent" + parent.id)
    setGrid(grid.map((rows) =>
      rows.map((cols) =>
        cols.id === parent.id ? {
          ...cols,
          state: parent.state,
          island: currentCell.id,
          parent: true
        } : cols
      )
    ));
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
