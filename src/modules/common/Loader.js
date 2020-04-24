import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "tachyons-components";
import ReactLoading from "react-loading";
import Dialog from '@material-ui/core/Dialog';

const Section = styled('div')`flex flex-wrap content-center justify-center w-100 h-100 bg-white`;
const Article = styled('div')`w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap`;
const Prop = styled('h3')`f5 f4-ns mb0 white`;
const Title = styled('h1') `f4 f3-ns white w-100 tc`;
const list = [
  {
    prop: "balls",
    name: "Balls"
  },
  {
    prop: "bars",
    name: "Bars"
  },
  {
    prop: "bubbles",
    name: "Bubbles"
  },
  {
    prop: "cubes",
    name: "Cubes"
  },
  {
    prop: "cylon",
    name: "Cylon"
  },
  {
    prop: "spin",
    name: "Spin"
  },
  {
    prop: "spinningBubbles",
    name: "SpinningBubbles"
  },
  {
    prop: "spokes",
    name: "Spokes"
  }
];


const Loader = () => (  
    <Dialog
      open={true}
      fullWidth
      fullScreen
    >
      <Section>
        <ReactLoading type={'spin'} color="#007bff" height={'3%'} width={'3%'} />
        {/* <CircularProgress color= "primary" /> */}
      </Section>
    </Dialog>

);


export default Loader;
