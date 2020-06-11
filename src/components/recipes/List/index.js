import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as R from "ramda";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { recipeActions } from "store/recipe/actions";
import { getItems } from "store/recipe/selectors";

import "./styles.css";

export const RecipesList = (props) => {
  const dispatch = useDispatch();

  const items = useSelector(getItems);

  useEffect(() => {
    dispatch(recipeActions.getItems());
  }, [dispatch]);

  const rendererItems = useMemo(() => {
    return R.compose(
      R.map((item) => {
        return (
          <TableRow key={item.id}>
            <TableCell component="th" scope="row">
              {item.name}
            </TableCell>
            <TableCell component="th" scope="row">
              {R.length(item.likes)}
            </TableCell>
            <TableCell component="th" scope="row">
              {item.complexity}
            </TableCell>
            <TableCell component="th" scope="row">
              <div className="recipe-item-ingredients-list">
                {R.map((ingredient) => {
                  return <span key={ingredient.id}>{ingredient.name}</span>;
                })(item.ingredients)}
              </div>
            </TableCell>
          </TableRow>
        );
      }),
      R.values
    )(items);
  }, [items]);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Likes</TableCell>
            <TableCell>Complexity</TableCell>
            <TableCell>Ingredients</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rendererItems}</TableBody>
      </Table>
    </TableContainer>
  );
};
