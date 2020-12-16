// import React from "react";
// import {
//   Theme,
//   createStyles,
//   makeStyles,
//   useTheme,
// } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/Delete";
// import {
//   ButtonGroup,
//   Button,
//   CardActions,
//   Divider,
//   CardActionArea,
//   Box,
// } from "@material-ui/core";

// import { useRecoilState } from "recoil";
// import { useHistory } from "react-router-dom";
// import { number } from "prop-types";
// import Carousel from "react-material-ui-carousel";
// import {
//   addComboToCart,
//   removeComboFromCart,
//   dropCombo,
//   moneyFormater,
// } from "../../components/ReuseableFunction";
// import { CartState } from "../../interfaces";
// import { cartState } from "../state";
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: "flex",
//     },
//     details: {
//       display: "flex",
//     },

//     content: {
//       flex: "1 0 auto",
//     },
//     cover: {
//       width: 151,
//     },
//     float: {
//       float: "right",
//     },
//     divider: {
//       marginTop: theme.spacing(2),
//     },
//     controls: {
//       display: "flex",
//       alignItems: "center",
//       paddingLeft: theme.spacing(1),
//       paddingBottom: theme.spacing(1),
//     },
//     playIcon: {
//       height: 38,
//       width: 38,
//     },
//   })
// );

// const ComboCart = (item: any): JSX.Element => {
//   const classes = useStyles();
//   const [cart, setCart] = useRecoilState(cartState);
//   const history = useHistory();
//   const theme = useTheme();

//   return (
//     <div className={classes.details}>
//       <Box bgcolor="text.secondary">
//         <Card className={classes.root} elevation={0}>
//           <Carousel>
//             {item.combo.details.map((item: any) => {
//               console.log("item");
//               console.log(item);

//               return (
//                 <CardMedia
//                   className={classes.cover}
//                   src={
//                     item.product.image
//                       ? "http://localhost:5000/api/image/" + item.product.image
//                       : ""
//                   }
//                   component="img"
//                 />
//               );
//             })}
//           </Carousel>
//           <div className={classes.details}>
//             <CardContent>
//               <Typography component="div" variant="h6">
//                 {item.combo.name}
//               </Typography>
//               <Typography
//                 variant="subtitle1"
//                 color="textSecondary"
//                 component="div"
//               >
//                 {moneyFormater(item.combo.price)}
//               </Typography>
//             </CardContent>
//           </div>
//         </Card>
//       </Box>
//     </div>
//   );
// };
// export default ComboCart;

// // {each.details.map((item: any) => {
// //   return (
// //     <Box>
// //       <Card className={classes.root} elevation={0}>
// //         <CardMedia
// //           className={classes.cover}
// //           src={
// //             item.combo.image
// //               ? "http://localhost:5000/api/image/" +
// //                 item.combo.image
// //               : ""
// //           }
// //           component="img"
// //         />
// //         <div className={classes.details}>
// //           <CardContent>
// //             <Typography component="div" variant="h6">
// //               {"#" + number++ + ". "}
// //             </Typography>
// //             <Typography component="div" variant="h6">
// //               {item.combo.name}
// //             </Typography>
// //             <Typography
// //               variant="subtitle1"
// //               color="textSecondary"
// //               component="div"
// //             >
// //               {moneyFormater(item.combo.price)}
// //             </Typography>
// //           </CardContent>
// //         </div>
// //       </Card>
// //       <Divider />
// //     </Box>
// //   );
// // })}
