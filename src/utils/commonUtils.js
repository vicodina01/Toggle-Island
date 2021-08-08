
//get the parent cell with matching id
export const searchParentsGrid = (grid, rows, cols, id) => {
    let parentTop;
    let parentLeft;
    let parentRight;
    let parentDown;
    let countParents = 0;

    let parentTopLeft;
    let parentTopRight;
    let parentDownLeft;
    let parentDownRight;

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (grid[i][j].id === id) {
                console.log("search CURRENT:[[" + j + "][" + i + "]]");
                //search up
                if ((j - 1 > 0) && grid[i][j - 1] !== undefined && grid[i][j - 1].state) {
                    console.log("search LEFT");
                    parentTop = grid[i][j - 1];
                    countParents++;
                }
                //search left
                if ((i - 1 > 0) && grid[i - 1][j] !== undefined && grid[i - 1][j].state) {
                    console.log("search TOP");
                    parentLeft = grid[i - 1][j];
                    countParents++;
                }

                //search right
                if ((i + 1 < rows) && grid[i + 1][j] !== undefined && grid[i + 1][j].state) {
                    console.log("search DOWN");
                    parentRight = grid[i + 1][j];
                    countParents++;
                }

                //search down
                if ((j + 1 < cols) && grid[i][j + 1] !== undefined && grid[i][j + 1].state) {
                    console.log("search RIGHT");
                    parentDown = grid[i][j + 1];
                    countParents++;
                }


                //search up-left
                if ((i - 1 > 0) && (j - 1 > 0) && grid[i - 1][j - 1] !== undefined && grid[i - 1][j - 1].state) {
                    console.log("search UP-LEFT")
                    parentTopLeft = grid[i - 1][j - 1];
                    countParents++;
                }


                //search up-right
                if ((i + 1 < rows) && (j - 1 > 0) && grid[i + 1][j - 1] !== undefined && grid[i + 1][j - 1].state) {
                    console.log("search DOWN-LEFT")
                    parentTopRight = grid[i + 1][j - 1];
                    countParents++;
                }

                //search down-left
                if ((i - 1 > 0) && (j + 1 < cols) && grid[i - 1][j + 1] !== undefined && grid[i - 1][j + 1].state) {
                    console.log("search UP-RIGHT")
                    parentDownLeft = grid[i - 1][j + 1];
                    countParents++;
                }

                //search down-right
                if ((i + 1 < rows) && (j + 1 < cols) && grid[i + 1][j + 1] !== undefined && grid[i + 1][j + 1].state) {
                    console.log("search DOWN-RIGHT")
                    parentDownRight = grid[i + 1][j + 1];
                    countParents++;
                }
            }
        }
    }
    console.log("countParents:"+countParents);
    return {
        countParents,
        parentTop,
        parentLeft,
        parentRight,
        parentDown,
        parentTopLeft,
        parentTopRight,
        parentDownLeft,
        parentDownRight,
    };
}

//|---------|---------|---------|
//|  Cross  | Parent  |  Cross  |
//|---------|---------|---------|
//| Parent  | current |  Parent |
//|---------|---------|---------|
//| Cross   |  Parent |  Cross  |
//|---------|---------|---------|

//given an object of parents, 
//find out if the current cell 
//will become an island or 
//merge with one or more islands
export const processIslands = (currentCell, searchParents) => {
    const countParents = searchParents.countParents;

    const parentTop = searchParents.parentTop;
    const parentLeft = searchParents.parentLeft;
    const parentRight = searchParents.parentRight;
    const parentDown = searchParents.parentDown;

    const parentTopLeft = searchParents.parentTopLeft;
    const parentTopRight = searchParents.parentTopRight;
    const parentDownLeft = searchParents.parentDownLeft;
    const parentDownRight = searchParents.parentDownRight;


    const haveNotParents = parentTop === undefined && parentLeft === undefined &&
        parentRight === undefined && parentDown === undefined;

    const haveNotCrossParents = parentTopLeft === undefined && parentTopRight === undefined &&
        parentDownLeft === undefined && parentDownRight === undefined;

    const haveAnyParents = parentTop !== undefined || parentLeft !== undefined ||
        parentRight !== undefined || parentDown !== undefined;

    const haveAnyCrossParents = parentTopLeft !== undefined || parentTopRight !== undefined ||
        parentDownLeft !== undefined || parentDownRight !== undefined;

    const haveAllParents = parentTop !== undefined && parentLeft !== undefined &&
        parentRight !== undefined && parentDown !== undefined;

    const haveAllCrossParents = parentTopLeft !== undefined && parentTopRight !== undefined &&
        parentDownLeft !== undefined && parentDownRight !== undefined;


    let addIsland = 0;
    let addParent = 0;

   
    switch (countParents) {
        case 0:
            //add island
            addIsland = 1;
            addParent = 0;
            break;
        case 1:
            if (haveAnyParents) {
                //merge 1 island
                addIsland = 1;
                addParent = -1;
            } else if (haveAnyCrossParents) {
                //add island
                addIsland = 1;
                addParent = 0;
            }
            break;
        case 2:
            if (haveNotCrossParents) {
                //merge 2 islands
                addIsland = 1;
                addParent = -2;
            } else
                if (haveNotParents) {
                    //add island
                    addIsland = 1;
                    addParent = 0;
                } else {
                    //merge 1 island
                    addIsland = 1;
                    addParent = -1;
                }
            break;
        case 3:
            if (haveNotCrossParents) {
                //merge 3 islands
                addIsland = 1;
                addParent = -3;
            } else if (haveNotParents) {
                //add island
                addIsland = 1;
                addParent = 0;
            } else if (haveAnyCrossParents) {
                if ((parentLeft !== undefined && parentRight !== undefined) ||
                    (parentTop !== undefined && parentDown !== undefined)) {
                    //merge 2 islands
                    addIsland = 1;
                    addParent = -2;
                }else{
                    if ((parentLeft !== undefined && parentDown !== undefined) ||
                    (parentTop !== undefined && parentRight !== undefined) ||
                    (parentLeft !== undefined && parentTop !== undefined)||
                    (parentDown !== undefined && parentRight !== undefined)){
                        //merge 1 islands
                        addIsland = 1;
                        addParent = -1;
                    }
                }
            }
            
            break;
        case 4:
            if (haveAllParents) {
                //merge 4 islands
                addIsland = 1;
                addParent = -4;
            } else if (haveAllCrossParents) {
                //add island
                addIsland = 1;
                addParent = 0; 
            }else if ((parentLeft !== undefined && parentRight !== undefined && parentTop === undefined && parentDown === undefined) || 
                (parentLeft === undefined && parentRight === undefined && parentTop !== undefined && parentDown !== undefined)){
                //merge 2 islands
                addIsland = 1;
                addParent = -2;
                console.log("here1");
            } else if((parentTop !== undefined && parentTopRight === undefined && parentRight !== undefined) ||
                (parentLeft !== undefined && parentDownLeft === undefined && parentDown !== undefined) ||       
                (parentDown !== undefined && parentDownRight === undefined && parentLeft !== undefined) ||
                (parentLeft !== undefined && parentTopLeft === undefined && parentTop !== undefined)){
                //merge 2 islands
                addIsland = 1;
                addParent = -2;  
                console.log("here2");         
            }else{
                //merge 1 islands
                addIsland = 1;
                addParent = -1;
                console.log("here3");
            }
            break;
        case 5:
            if (haveAllParents) {
                //merge 3 islands
                addIsland = 1;
                addParent = -3;
            } else if (haveAllCrossParents){
                //merge 1 island
                addIsland = 1;
                addParent = -1;
            }else if (haveAnyParents){
                if((parentTopLeft !== undefined && parentDownRight !== undefined) ||
                    (parentTopRight !== undefined && parentDownLeft !== undefined)){
                    //merge 2 island
                    addIsland = 1;
                    addParent = -2;
                }else{
                    //merge 1 island
                    addIsland = 1;
                    addParent = -1;
                
                }
            }
            break;
        case 6:
            if ((haveAllCrossParents && (parentLeft !== undefined && parentRight !== undefined)) ||
                (haveAllCrossParents && (parentTop !== undefined && parentDown !== undefined))) {
                //merge 2 islands
                addIsland = 1;
                addParent = -2;
            } else if ((haveAllCrossParents && (parentLeft !== undefined && parentDown !== undefined)) ||
                (haveAllCrossParents && (parentTop !== undefined && parentRight !== undefined)) ||
                (haveAllCrossParents && (parentLeft !== undefined && parentTop !== undefined)) ||
                (haveAllCrossParents && (parentDown !== undefined && parentRight !== undefined))) {
                //merge 1 island         
                addIsland = 1;
                addParent = -1;
            } else if (haveAllParents && haveAnyCrossParents) {
                //merge 1 island 
                addIsland = 1;
                addParent = -1;
            }
            break;
        case 7:
        case 8:
            //merge 1 island  
            addIsland = -1;
            addParent = 1;
            break;
        default:
                // do nothing
    }

    addIsland = !currentCell.state ? addIsland : addIsland * -1;
    addParent = !currentCell.state ? addParent : addParent * -1;

    return { addIsland, addParent }
}